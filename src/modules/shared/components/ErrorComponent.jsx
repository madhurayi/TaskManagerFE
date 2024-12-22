export const ErrorComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
      <p className="mb-4">We are sorry for the inconvenience. We are already working on it.</p>
      <p className="italic">{error?.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition duration-300"
      >
        Reload Page
      </button>
    </div>
  );
};
