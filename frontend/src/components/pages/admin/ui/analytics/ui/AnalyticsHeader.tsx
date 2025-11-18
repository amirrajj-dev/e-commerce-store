import { RefreshCw } from "lucide-react";
import type { AnalyticsHeaderProps } from "../types/types";

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  lastFetched,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-success">
          Analytics Dashboard
        </h2>
        <p className="text-success/70">
          Overview of your store performance
          {lastFetched && (
            <span className="text-sm ml-2">
              (Last updated: {new Date(lastFetched).toLocaleTimeString()})
            </span>
          )}
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="btn btn-success btn-soft sm:btn-sm gap-2 w-full sm:w-auto" 
      >
        <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  );
};

export default AnalyticsHeader;