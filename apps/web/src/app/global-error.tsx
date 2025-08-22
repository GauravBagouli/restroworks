"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-red-600">Server Error</h1>
    <p className="mt-2 text-gray-700">
        {error?.message || "Something went wrong."}
    </p>
    <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
        Try Again
    </button>
    </div>
  );
}
