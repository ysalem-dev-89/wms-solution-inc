import { Op } from 'sequelize';
import TransactionProduct from '../models/TransactionProductModel';
import Transaction from '../models/TransactionModel';
import { sequelize } from '../db/connection';
import { QueryTypes } from 'sequelize';

export default class AnalyticsQuery {
  //   static monthlyRevenueHH = async (year: number) => {
  //     const purchases = [];
  //     // t(purchase) => tp:t.id, year, month, closed = Count(quantity * unitPrice)
  //     // t(sale) => tp:t.id, year, month, closed = Count(quantity * unitPrice)

  //     let month = 1;
  //     while (month < 13) {
  //       const currMonth = await Transaction.findAndCountAll({
  //         include: [{ model: TransactionProduct, required: true }],
  //         limit: 3,
  //         attributes: ['id'],
  //         where: {
  //           type: 'purchase',
  //           // include
  //           createdAt: {
  //             [Op.gte]: moment('0101', 'MMDD')
  //               .add(month - 1, 'months')
  //               .toDate(),
  //             [Op.lt]: moment('0101', 'MMDD').add(month, 'months').toDate()
  //           }
  //         }
  //       });

  //       purchases.push(currMonth);

  //       month++;
  //     }
  //     return { purchases };
  //   };

  static monthlyRevenue = async (year: number): any => {
    console.log('Query: ', year);
    const start = new Date(`${year}-01-06 00:00:00`);
    const end = new Date(`${year}-02-15 00:00:00`);
    // const start = new Date(`${year}-01-01 00:00:00`);
    // const end = new Date(`${year}-12-31 00:00:00`);

    // t(purchase) => tp:t.id, year, month, closed = Count(quantity * unitPrice)
    // t(sale) => tp:t.id, year, month, closed = Count(quantity * unitPrice)

    return TransactionProduct.findAll({
            sequelize.query(`SELECT
             DATE_TRUNC('month',updatedAt)
               AS  production_to_month,
             COUNT(status) AS totalCount
      FROM TransactionProduct
      GROUP BY DATE_TRUNC('month',updatedAt);`, {
              type: QueryTypes.SELECT
            }),

      attributes: [
        ['updatedAt', 'Date'],

        // [sequelize.literal('(quantity*unitPrice)'), 'total']

        // [
        //   sequelize.fn(
        //     'sum',
        //     sequelize.col(sequelize.literal('(quantity*unitPrice)'))
        //   ),
        //   'total'
        // ]
        (sequelize.literal(
          'sum("TransactionProducts"."unitPrice" * "TransactionProducts"."quantity")'
        ),
        'totalCost')
      ],

      where: {
        status: 'closed',
        updatedAt: { [Op.between]: [start, end] }

        // order: [['updatedAt', 'ASC']]
      },
      // group: ['status'],
      raw: true,
      group: ['updatedAt']
      // include: [
      //   {
      //     model: Transaction,
      //     attributes: ['*'],
      //     where: {
      //       type: 'purchase',
      //       order: [['updatedAt', 'ASC']]
      //     }
      //   }
      // ]
    });
  };
}

// select extract(year from tp."updatedAt") as y, null,
//   extract(month from tp."updatedAt") as m,
//   sum("quantity" * "unitPrice") as total
// from "TransactionProducts" tp  inner join "Transactions" t
// on tp."TransactionId" = t."id"
// where type = 'purchase' and status = 'closed'
// group by(y), (m)
// ORDER by m ASC;

//! purchases
// select
// extract(year from tp."updatedAt") as y, null,
//   extract(month from tp."updatedAt") as m,
//   sum("quantity" * "unitPrice") as total
// from "TransactionProducts" tp  inner join "Transactions" t
// on tp."TransactionId" = t."id"
// where type = 'purchase' and status = 'closed'
// group by(y), (m)
// ORDER by y, m ASC;

//! sales
// select
// extract(year from tp."updatedAt") as Year,
//   extract(month from tp."updatedAt") as Month,
//   sum("quantity" * "unitPrice") as total
// from "TransactionProducts" tp  inner join "Transactions" t
// on tp."TransactionId" = t."id"
// where type = 'sale' and status = 'closed'
// group by(Year), (Month)
// ORDER by year, Month ASC;
