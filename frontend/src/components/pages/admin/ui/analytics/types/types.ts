import type { AnalyticsDataI } from "../../../../../../types/interfaces/analytics.interface";

export interface AnalyticsHeaderProps {
  lastFetched?: string;
  onRefresh: () => void;
  isLoading: boolean;
}

export interface StatsGridProps {
  data?: {
    analyticsData?: AnalyticsDataI;
  };
}

export interface ChartsGridProps {
  chartData: any[];
}

export interface PerformanceSummaryProps {
  data: {
    analyticsData: AnalyticsDataI;
  };
  chartData: any[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  index: number;
}

export interface ChartCardProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}