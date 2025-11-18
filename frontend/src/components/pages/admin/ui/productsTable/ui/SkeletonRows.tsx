const SkeletonRows = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <tr key={index} className="animate-pulse">
          <td>
            <div className="h-4 skeleton bg-base-content/40 rounded w-6"></div>
          </td>
          <td>
            <div className="flex gap-2 items-center">
              <div className="size-14 skeleton bg-base-content/40 rounded-full"></div>
              <div className="h-4 skeleton bg-base-content/40 rounded w-24"></div>
            </div>
          </td>
          <td>
            <div className="h-4 skeleton bg-base-content/40 rounded w-16"></div>
          </td>
          <td>
            <div className="h-4 skeleton bg-base-content/40 rounded w-12"></div>
          </td>
          <td>
            <div className="h-4 skeleton bg-base-content/40 rounded w-20"></div>
          </td>
          <td>
            <div className="h-6 skeleton bg-base-content/40 rounded-full w-6"></div>
          </td>
          <td>
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 skeleton bg-base-content/40 rounded-full"></div>
              <div className="h-8 w-8 skeleton bg-base-content/40 rounded-full"></div>
              <div className="h-8 w-8 skeleton bg-base-content/40 rounded-full"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SkeletonRows;
