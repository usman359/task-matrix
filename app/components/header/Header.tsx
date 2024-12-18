export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Task Matrix</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="/tasks" className="text-gray-600 hover:text-blue-500">
                Tasks
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
