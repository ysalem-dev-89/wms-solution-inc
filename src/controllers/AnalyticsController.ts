/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request, NextFunction } from 'express';
import { IMonthlyData } from '../interfaces/AnalyticsInterface';
import AnalyticsQuery from '../queries/AnalyticsQuery';

export default class AnalyticsController {
  static addNulls = (arr: IMonthlyData[], type: string) => {
    const newArr = [...Array(12)].map(() => 0);
    arr.forEach(
      (row: IMonthlyData) =>
        (newArr[+row.m - 1] = type === 'sale' ? +row.sales : +row.purchases)
    );
    return newArr;
  };

  static getMonthlyRevenue = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { year } = req.params;
      const currData = await AnalyticsQuery.monthlyRevenue(year);
      const purchases = this.addNulls(currData[0], 'purchase');
      const sales = this.addNulls(currData[0], 'sale');
      const revenues = [...Array(12)].map((_, i) =>
        (sales[i] - purchases[i]).toFixed(1)
      );
      res.json({
        status: 200,
        message: 'Success',
        purchases,
        sales,
        revenues
      });
    } catch (error) {
      next(error);
    }
  };

  static getTotalStatistics = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const totalStatistics = await AnalyticsQuery.totalStatistics();
      const { totalpurchases, totalsales } = totalStatistics[0][0];
      res.json({
        status: 200,
        message: 'Success',
        totalStatistics: {
          totalpurchases,
          totalsales,
          totalrevenues: totalsales - totalpurchases
        }
      });
    } catch (error) {
      next(error);
    }
  };

  static getTopSelling = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const topSelling = await AnalyticsQuery.topSelling();
      const products: string[] = topSelling[0].map((p: any) => p.product);
      const salesCount: string[] = topSelling[0].map((s: any) => +s.sales);
      res.json({
        status: 200,
        message: 'Success',
        products,
        salesCount
      });
    } catch (error) {
      next(error);
    }
  };

  static getStockAlert = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inStock = await AnalyticsQuery.stockAlert(500);
      res.json({
        status: 200,
        message: 'Success',
        inStock: inStock[0]
      });
    } catch (error) {
      next(error);
    }
  };
}
