import { useState } from "react";

interface Task {
  id?: string;
  title: string;
  status: string;
  completed: boolean;
}

interface ModalProps {
  task?: Task;
  onClose: () => void;
  onSave: (task: Task) => void; // Allows creation of new tasks
}

export default function Modal({ task, onClose, onSave }: ModalProps) {
  const [title, setTitle] = useState<string>(task?.title || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty submissions
    onSave({
      ...(task || { id: "", status: "", completed: false }),
      id: task?.id || String(Date.now()),
      title,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Task Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter task title"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
