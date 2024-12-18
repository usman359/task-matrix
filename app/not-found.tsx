"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-gray-700 text-lg mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}