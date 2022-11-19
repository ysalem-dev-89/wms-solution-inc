/* eslint-disable @typescript-eslint/no-explicit-any */
import { sequelize } from '../db/connection';

export default class AnalyticsQuery {
  static monthlyRevenue = async (year: string): Promise<any> => {
    return sequelize.query(
      `
        select 
        extract(year from tp."updatedAt") as y,
        extract(month from tp."updatedAt") as m,
        sum(case when type = 'purchase' 
          and status = 'closed'
          then nullif("quantity" * "unitPrice", 0) 
          else 0 end) as purchases,
        sum(case when type = 'sale'
          and status = 'closed' 
          or status = 'reversed' 
          then nullif("quantity" * "unitPrice", 0) 
          else 0 end) as sales
        from "TransactionProducts" tp
        inner join "Transactions" t
        on tp."TransactionId" = t."id"
          and extract(year from tp."updatedAt") = ${year}
        group by(y), (m)
        order by y, m asc;
      `
    );
  };

  static totalStatistics = async (): Promise<any> => {
    return sequelize.query(
      `
        select
        SUM(case when type = 'purchase'
          and status = 'closed'
          then "quantity" * "unitPrice"
          else 0 end) as totalPurchases,
        SUM(case when type = 'sale'
          and status = 'closed'
          or status = 'reversed'
          then "quantity" * "unitPrice"
          else 0 end) AS totalSales
        from "TransactionProducts" tp
        inner join "Transactions" t
        on tp."TransactionId" = t."id";
        `
    );
  };

  static topSelling = async (): Promise<any> => {
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
        and status ='closed'
        group by (product)
        order by sales desc
        limit 5;
        `
    );
  };

  static stockAlert = async (edge: number): Promise<any> => {
    return sequelize.query(
      `
        select
        p."id" as productId,
        title as product,
        price,
        discount,
        (
          sum(case when type = 'purchase'
          and status = 'closed'
          and extract(month from tp."updatedAt")
          between extract(month from now() - interval '6 months')
          and extract(month from now())
          then "quantity" else 0 end)
        - sum(case when type = 'sale'
          and status = 'closed'
          and extract(month from tp."updatedAt")
          between extract(month from now() - interval '3 months')
          and extract(month from now())
          then "quantity" else 0 end)
        ) as inStock
        from"TransactionProducts" tp
        inner join "Transactions" t
        on tp."TransactionId" = t."id"
        inner join "Products" p
        on tp."ProductId" = p."id"
        group by (productId, product)
        having(
          sum(case when type = 'purchase'
          and status = 'closed'
          and extract(month from tp."updatedAt")
          between extract(month from now() - interval '6 months')
          and extract(month from now())
          then "quantity" else 0 end)
        - sum(case when type = 'sale'
          and status = 'closed'
          and extract(month from tp."updatedAt")
          between extract(month from now() - interval '3 months')
          and extract(month from now())
          then "quantity" else 0 end)
        ) < ${edge}
        order by inStock desc;
        `
    );
  };
}
