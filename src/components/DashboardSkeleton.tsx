export default function DashboardSkeleton() {
  return (
    <div
      role="status"
      className="p-8 bg-black-200 rounded-lg text-white-900 text-center md:text-left"
    >
      <div className="animate-pulse h-2.5 bg-gray-500 rounded-full w-48 mb-4"></div>
      <div className="animate-pulse h-2 bg-gray-500 rounded-full w-full max-w-md mb-2.5"></div>
      <div className="animate-pulse h-2 bg-gray-500 rounded-full w-full max-w-md mb-2.5"></div>
      <div className="animate-pulse h-2 bg-gray-500 rounded-full w-full max-w-lg mb-2.5"></div>
      <div className="animate-pulse h-2 bg-gray-500 rounded-full w-full max-w-xl mb-2.5"></div>
      <div className="animate-pulse h-2 bg-gray-500 rounded-full w-full max-w-lg"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
