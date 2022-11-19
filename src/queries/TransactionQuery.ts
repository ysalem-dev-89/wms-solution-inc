import { TransactionType } from 'interfaces/TransactionInterface';
import { Op } from 'sequelize';
import { sequelize } from '../db/connection';
import Transaction from '../models/TransactionModel';
import { TransactionProduct as TransactionProductInterface } from '../interfaces/TransactionProductInterface';
import TransactionProduct from '../models/TransactionProductModel';
import User from '../models/UserModel';
import GenericError from '../helpers/GenericError';
import Product from '../models/ProductModel';

export default class TransactionQuery {
  static createNewTransaction = async ({
    type,
    issuedBy,
    transactionProducts
  }: {
    type: TransactionType;
    issuedBy: number;
    transactionProducts: TransactionProductInterface[];
  }) => {
    const transaction = await Transaction.create({ type });

    const user = await User.findByPk(issuedBy);
    if (!user) throw new GenericError('Not found', 400);

    await user?.addTransaction(transaction.id);

    transactionProducts.forEach(async transactionProduct => {
      await transaction.createTransactionProduct(transactionProduct);
    });
    return transaction;
  };

  static updateOneTransaction = async ({
    id,
    type,
    transactionProducts
  }: {
    id: number;
    type: TransactionType;
    issuedBy: number;
    transactionProducts: TransactionProductInterface[];
  }) => {
    let transaction = await Transaction.findByPk(id);
    if (!transaction) throw new GenericError('Not found', 400);

    transaction = await transaction?.update({ type });
    if (!transaction) throw new GenericError('Not found', 400);

    TransactionProduct.destroy({
      where: { TransactionId: id }
    });

    transactionProducts.forEach(async transactionProduct => {
      transaction &&
        (await transaction.createTransactionProduct(transactionProduct));
    });
    return transaction;
  };

  static deleteOneTransaction = async (id: number) => {
    return Transaction.destroy({
      where: {
        id
      }
    });
  };

  static getTransactions = async ({
    id,
    search,
    type,
    limit,
    offset
  }: {
    id: string;
    search: string;
    type: string;
    limit: number;
    offset: number;
  }) => {
    const filter = id
      ? { id: Number(id.trim()) }
      : {
          [Op.and]: [
            type == 'purchase' || type == 'sale' ? { type: type } : {},
            sequelize.where(sequelize.fn('lower', sequelize.col('username')), {
              [Op.like]: `%${search.toLowerCase()}%`
            })
          ]
        };

    return Transaction.findAndCountAll({
      where: filter,
      attributes: [
        'Transaction.id',
        'type',
        'Transaction.createdAt',
        'Transaction.updatedAt',
        'User.username',
        [
          sequelize.fn(
            'count',
            sequelize.col('TransactionProducts.TransactionId')
          ),
          'productsCount'
        ],
        [
          sequelize.literal(
            'sum("TransactionProducts"."unitPrice" * "TransactionProducts"."quantity")'
          ),
          'totalCost'
        ]
      ],
      include: [
        {
          model: User,
          attributes: [],
          duplicating: false
        },
        {
          model: TransactionProduct,
          attributes: [],
          duplicating: false
        }
      ],
      order: [['id', 'DESC']],
      group: [
        'Transaction.id',
        'type',
        'Transaction.createdAt',
        'Transaction.updatedAt',
        'User.username'
      ],
      raw: true,
      limit,
      offset
    });
  };

  static getOneTransaction = async ({ id }: { id: number }) => {
    const transaction = await Transaction.findByPk(id, {
      include: {
        model: User
      }
    });

    if (!transaction) throw new GenericError('Not found', 400);

    const transactionProducts = await TransactionProduct.findAll({
      where: { TransactionId: id },
      include: {
        model: Product
      }
    });

    if (!transactionProducts) throw new GenericError('Not found', 400);

    return {
      transaction,
      transactionProducts
    };
  };
}
