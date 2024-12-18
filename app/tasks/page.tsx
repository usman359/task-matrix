import TaskMatrix from "../components/task/TaskMatrix";

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Task Matrix
        </h1>
        <TaskMatrix />
      </div>
    </main>
  );
}
