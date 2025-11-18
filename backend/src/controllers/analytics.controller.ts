import type { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma.js';
import { ApiResponseHelper } from '../helpers/api.helper.js';

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
    ]);

    const totalRevenue = revenueData._sum.totalAmount || 0;

    // Define last 7 days range
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySales = await getDailySalesData(startDate, endDate);

    return res.status(200).json(
      ApiResponseHelper.success(
        'Analytics fetched successfully',
        {
          analyticsData: {
            totalUsers,
            totalProducts,
            totalSales: totalOrders,
            totalRevenue,
            dailySales,
          },
        },
        req.path,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const getDailySalesData = async (startDate: Date, endDate: Date) => {
  const salesData = await prisma.order.groupBy({
    by: ['createdAt'],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: { _all: true },
    _sum: { totalAmount: true },
  });

  // Format into { date, sales, revenue }
  const formatted = salesData.map((item) => ({
    date: item.createdAt.toISOString().split('T')[0],
    sales: item._count._all,
    revenue: item._sum.totalAmount || 0,
  }));

  // Fill missing dates with 0 data
  const dateArray = getDatesInRange(startDate, endDate);
  return dateArray.map((date) => {
    const found = formatted.find((d) => d.date === date);
    return found || { date, sales: 0, revenue: 0 };
  });
};

// Helper to generate date list between two dates
function getDatesInRange(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(current.toISOString().split('T')[0] as string);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
