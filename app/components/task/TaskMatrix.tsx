"use client";

import { auth, db } from "@/app/lib/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref, remove, set, update } from "firebase/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import FullSpinner from "../spinner/FullSpinner";
import TaskGrid from "./TaskGrid";
import { useLoading } from "@/app/contexts/LoadingContext";

interface Task {
  id: string;
  title: string;
  status: string;
  completed: boolean;
}

export default function TaskMatrix() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTaskStatus, setNewTaskStatus] = useState<string>("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, setIsLoading } = useLoading();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("User not signed in, redirecting to login...");
        router.push("/login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router, setIsLoading]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = () => {
      if (user) {
        setIsLoading(true);
        const tasksRef = ref(db, `users/${user.uid}/tasks`);

        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const activeTasks: Task[] = [];

          if (data) {
            Object.keys(data).forEach((key) => {
              const task = { id: key, ...data[key] };
              if (!task.completed) activeTasks.push(task); // Filter active tasks
            });
          }

          setTasks(activeTasks);

          // Update cache
          localStorage.setItem("tasks", JSON.stringify(activeTasks));
          setIsLoading(false);
        });
      }
    };

    if (user) fetchTasks();
  }, [setIsLoading, user]);

  const openModal = (status: string, task: Task | null = null) => {
    setNewTaskStatus(status);
    setEditTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const handleSaveTask = async (task: Partial<Task>) => {
    setIsLoading(true);
    if (!user) return;

    const taskRef = ref(db, `users/${user.uid}/tasks/${task.id || Date.now()}`);
    const newTask: Task = {
      id: task.id || String(Date.now()),
      title: task.title || "Untitled Task",
      status: task.status || newTaskStatus,
      completed: task.completed || false,
    };

    await set(taskRef, newTask);
    closeModal();
    setIsLoading(false);
  };

  // Delete a task
  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    if (!user) return;

    try {
      const taskRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
      await remove(taskRef);

      setTasks((prev) => prev.filter((t) => t.id !== taskId));

      // Update cache
      localStorage.setItem(
        "tasks",
        JSON.stringify({
          tasks: tasks.filter((t) => t.id !== taskId),
        })
      );
    } catch (error) {
      console.error("Error deleting task:", (error as Error).message);
    }
    setIsLoading(false);
  };

  const handleCompleteTask = async (task: Task) => {
    setIsLoading(true);
    if (!user) return;

    const taskRef = ref(db, `users/${user.uid}/tasks/${task.id}`);
    await update(taskRef, { completed: true });

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((t) => t.id !== task.id))
    );
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <FullSpinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <Link href="/tasks/completed" className="text-blue-500 underline">
          View Completed Tasks
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen">
          {/* Grid 1: Done & Completed */}
          <TaskGrid
            title="Done & Completed"
            status="completed"
            tasks={tasks}
            onAddTask={() => openModal("completed")}
            onEditTask={(task: Task) => openModal(task.status, task)}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />

          {/* Grid 2: Done but Not Completed */}
          <TaskGrid
            title="Done but Not Completed"
            status="notCompleted"
            tasks={tasks}
            onAddTask={() => openModal("notCompleted")}
            onEditTask={(task: Task) => openModal(task.status, task)}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />

          {/* Grid 3: Done but Pending */}
          <TaskGrid
            title="Done but Pending"
            status="pending"
            tasks={tasks}
            onAddTask={() => openModal("pending")}
            onEditTask={(task: Task) => openModal(task.status, task)}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />

          {/* Grid 4: Do it Later/Dump */}
          <TaskGrid
            title="Do it Later/Dump"
            status="notUrgent"
            tasks={tasks}
            onAddTask={() => openModal("notUrgent")}
            onEditTask={(task: Task) => openModal(task.status, task)}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />

          {/* Modal for Add or Edit Task */}
          {showModal && (
            <Modal
              task={editTask || undefined}
              onClose={closeModal}
              onSave={handleSaveTask}
            />
          )}
        </div>
      </div>
    </>
  );
}
