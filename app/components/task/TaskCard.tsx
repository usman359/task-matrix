import { useLoading } from "@/app/contexts/LoadingContext";
import ButtonSpinner from "../spinner/ButtonSpinner";

interface Task {
  id: string;
  title: string;
  status?: string;
  completed?: boolean;
}

interface TaskCardProps {
  index: number;
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  onUndo?: () => void;
}

export default function TaskCard({
  index,
  task,
  onEdit,
  onDelete,
  onComplete,
  onUndo,
}: TaskCardProps) {
  const { isLoading } = useLoading();

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        {/* Task Title */}
        <h3 className="text-lg font-semibold text-gray-700">
          {index + 1}.{" "}
          {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              title="Mark as Completed"
            >
              {isLoading ? <ButtonSpinner /> : "Complete"}
            </button>
          )}
          {onUndo && (
            <button
              onClick={onUndo}
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              title="Undo"
            >
              {isLoading ? <ButtonSpinner /> : "Undo"}
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
