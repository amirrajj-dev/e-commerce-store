import { useEffect } from "react";
import { useAnalytics } from "../../../../../hooks/useAnalytics";
import AnalyticsHeader from "./ui/AnalyticsHeader";
import StatsGrid from "./ui/StatsGrid";
import ChartsGrid from "./ui/ChartsGrid";
import PerformanceSummary from "./ui/PerformanceSummary";
import ErrorState from "./ui/ErrorState";
import type { AnalyticsI } from "../../../../../types/interfaces/analytics.interface";
import LoadingState from "../../../../common/LoadingState";

const Analytics = () => {
  const {
    data,
    fetchAnalytics,
    isLoading,
    error,
    lastFetched,
    refreshAnalytics,
  } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Format daily sales data for charts
  const chartData =
    data?.analyticsData?.dailySales?.map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: Math.round(item.revenue),
    })) || [];

  if (isLoading) {
    return <LoadingState txt="Loading analytics data..." />;
  }

  if (error) {
    return <ErrorState onRetry={refreshAnalytics} />;
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader 
        lastFetched={lastFetched as string} 
        onRefresh={refreshAnalytics}
        isLoading={isLoading}
      />
      
      <StatsGrid data={data as AnalyticsI} />
      
      <ChartsGrid chartData={chartData} />
      
      {data?.analyticsData && (
        <PerformanceSummary 
          data={data} 
          chartData={chartData} 
        />
      )}
    </div>
  );
};

export default Analytics;