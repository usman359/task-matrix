export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-full z-50">
      <div className="w-12 h-12 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
