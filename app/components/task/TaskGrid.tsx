import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  status: string;
  completed: boolean;
}

interface TaskGridProps {
  title: string;
  status: string;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (task: Task) => void;
}

export default function TaskGrid({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}: TaskGridProps) {
  const filteredTasks = tasks?.filter((task) => task.status === status);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative h-96 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-2">{title}</h2>
      <button
        onClick={onAddTask}
        className="absolute top-4 right-4 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-600 transition"
        title="Add Task"
      >
        +
      </button>
      <div className="space-y-4">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              index={index}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              onComplete={() => onCompleteTask(task)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No tasks in this category.</p>
        )}
      </div>
    </div>
  );
}
