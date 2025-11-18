import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import type{ StatsGridProps } from "../types/types";
import StatCard from "./StatCard";

const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data?.analyticsData?.totalUsers || 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-base-200",
    },
    {
      title: "Total Products",
      value: data?.analyticsData?.totalProducts || 0,
      icon: Package,
      color: "text-green-500",
      bgColor: "bg-base-200",
    },
    {
      title: "Total Sales",
      value: data?.analyticsData?.totalSales || 0,
      icon: ShoppingCart,
      color: "text-purple-500",
      bgColor: "bg-base-200",
    },
    {
      title: "Total Revenue",
      value: `$${data?.analyticsData?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "text-amber-500",
      bgColor: "bg-base-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
};

export default StatsGrid;