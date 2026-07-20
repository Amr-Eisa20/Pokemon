export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};