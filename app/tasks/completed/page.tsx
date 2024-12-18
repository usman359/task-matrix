"use client";

import FullSpinner from "@/app/components/spinner/FullSpinner";
import TaskCard from "@/app/components/task/TaskCard";
import { onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase/firebase";
import { useLoading } from "@/app/contexts/LoadingContext";

interface Task {
  id: string;
  title: string;
  status: string;
  completed: boolean;
}

export default function CompletedTasksPage() {
  const router = useRouter();

  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchCompletedTasks = () => {
      if (user) {
        setIsLoading(true);
        const tasksRef = ref(db, `users/${user.uid}/tasks`);
        console.log(tasksRef);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const loadedCompletedTasks: Task[] = [];

          if (data) {
            Object.keys(data).forEach((key) => {
              const task = { id: key, ...data[key] };
              if (task.completed) loadedCompletedTasks.push(task);
            });
          }

          setCompletedTasks(loadedCompletedTasks);
          setIsLoading(false);
        });
      }
    };

    if (user) fetchCompletedTasks();
  }, [setIsLoading, user]);

  const handleUndoTask = async (task: Task) => {
    setIsLoading(true);
    if (!user) return;

    const taskRef = ref(db, `users/${user.uid}/tasks/${task.id}`);
    await update(taskRef, { completed: false });

    setCompletedTasks((prev) => prev.filter((t) => t.id !== task.id));
    router.push("/tasks");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <FullSpinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Completed Tasks</h1>
        <div className="space-y-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                index={index}
                task={task}
                onUndo={() => handleUndoTask(task)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No completed tasks found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
