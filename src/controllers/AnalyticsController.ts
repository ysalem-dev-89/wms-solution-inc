/* eslint-disable @typescript-eslint/no-explicit-any */
import { sequelize } from '../db/connection';
import { Response, Request, NextFunction } from 'express';
import { IMonthlyData } from '../interfaces/AnalyticsInterface';
import QueryString from 'qs';

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
      const getData = async (year: string): Promise<any> => {
        return sequelize.query(
          `
            select 
            extract(year from tp."updatedAt") as y,
            extract(month from tp."updatedAt") as m,
            sum(case when type = 'purchase' 
              then nullif("quantity" * "unitPrice", 0) 
              else 0 end) as purchases,
            sum(case when type = 'sale' 
              then nullif("quantity" * "unitPrice", 0) 
              else 0 end) as sales
            from "TransactionProducts" tp
            inner join "Transactions" t
            on tp."TransactionId" = t."id"
            where status = 'closed'
              and extract(year from tp."updatedAt") = ${year}
            group by(y), (m)
            order by y, m asc;
          `
        );
      };

      const currData = await getData(year);
      const purchases = this.addNulls(currData[0], 'purchase');
      const sales = this.addNulls(currData[0], 'sale');
      const revenues = [...Array(12)].map((_, i) => sales[i] - purchases[i]);

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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const getData = async (): Promise<any> => {
        return sequelize.query(
          `
            SELECT  
            SUM(CASE WHEN type = 'purchase'  
                THEN "quantity" * "unitPrice" 
                ELSE 0 END) AS totalPurchases,
            SUM(CASE WHEN type = 'sale' 
                THEN "quantity" * "unitPrice" 
                ELSE 0 END) AS totalSales
            from "TransactionProducts" tp
            inner join "Transactions" t
            on tp."TransactionId" = t."id"
            where status = 'closed';
          `
        );
      };

      const totalStatistics = await getData();
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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const getData = async (): Promise<any> => {
        return sequelize.query(
          `
          select
          title as product,
          sum("quantity") as sales
          from "TransactionProducts" tp
          inner join "Transactions" t
          on tp."TransactionId" = t."id"
          inner join "Products" p 
          on tp."ProductId" = p."id"
          where type = 'sale'
          group by (product)
          order by sales desc 
          limit 5;
          `
        );
      };

      const topSelling = await getData();
      const products: string[] = topSelling[0].map((p: any) => p.product);
      const sales: string[] = topSelling[0].map((s: any) => +s.sales);

      res.json({
        status: 200,
        message: 'Success',
        products,
        sales
      });
    } catch (error) {
      next(error);
    }
  };

  static getStockAlert = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const getCount = sequelize.query(`
      // select count()
      // `)
      const getData = async ({
        limit,
        offset
      }: {
        limit:
          | string
          | QueryString.ParsedQs
          | string[]
          | QueryString.ParsedQs[]
          | undefined;
        offset:
          | string
          | QueryString.ParsedQs
          | string[]
          | QueryString.ParsedQs[]
          | undefined;
      }): Promise<any> => {
        return sequelize.query(
          `
          select
          title as product,
          (
            sum(case when type = 'purchase'
            and status = 'closed'
            and extract(month from tp."updatedAt")
            between extract(month from now() - interval '4 months')
            and extract(month from now())
            then "quantity" else 0 END)
          - sum(case when type = 'sale'
            and extract(month from tp."updatedAt")
            between extract(month from now() - interval '4 months')
            and extract(month from now())
            then "quantity" else 0 END)
          ) as inStock
          from"TransactionProducts" tp
          inner join "Transactions" t
          on tp."TransactionId" = t."id"
          inner join "Products" p
          on tp."ProductId" = p."id"
          group by (product)
          having (
            sum(case when type = 'purchase'
            and status = 'closed'
            and extract(month from tp."updatedAt")
            between extract(month from now() - interval '4 months')
            and extract(month from now())
            then "quantity" else 0 END)
          - sum(case when type = 'sale'
            and extract(month from tp."updatedAt")
            between extract(month from now() - interval '4 months')
            and extract(month from now())
            then "quantity" else 0 END)
          ) <= 100
          order by inStock asc
          offset ${offset}
          limit '${limit}';
          `
        );
      };

      const { limit, offset } = req.query;
      const inStock = await getData({ limit, offset });

      console.log('inStock: ', inStock[0]);
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
