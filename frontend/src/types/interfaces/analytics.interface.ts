export interface DailySalesI {
  date: string;
  sales: number;
  revenue: number;
}

export interface AnalyticsDataI {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  dailySales: DailySalesI[];
}

export interface AnalyticsI {
  analyticsData: AnalyticsDataI;
}