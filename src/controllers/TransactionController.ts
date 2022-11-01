import { Response, NextFunction } from 'express';
import TransactionQuery from '../queries/TransactionQuery';
import { TransactionRequest } from '../interfaces/TransactionRequest';
import GenericError from '../helpers/GenericError';
import { Transaction, ValidationError } from 'sequelize';
import User from '../models/UserModel';

export default class TransactionController {
  static createNewTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type, issuedBy, transactionProducts } = req.body;
      const transaction = await TransactionQuery.createNewTransaction({
        type,
        issuedBy,
        transactionProducts
      });

      res.json({
        status: 201,
        message: 'Success',
        transaction: transaction
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static updateOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type, issuedBy, transactionProducts } = req.body;
      const { id } = req.params;
      const transaction = await TransactionQuery.updateOneTransaction({
        id: Number(id),
        type,
        issuedBy,
        transactionProducts
      });

      res.json({
        status: 201,
        message: 'Success',
        transaction: transaction
      });
    } catch (error) {
      const exception = error as ValidationError;
      const validationError = exception?.errors[0]?.message;

      if (validationError) {
        next(new GenericError(validationError, 400));
      }

      next(error);
    }
  };

  static deleteOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await TransactionQuery.deleteOneTransaction(Number(id));

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  static getTransactions = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type = '', search = '', offset = '0', limit = '20' } = req.query;
      const transactions = await TransactionQuery.getTransactions({
        type,
        search,
        limit: Number(limit),
        offset: Number(offset)
      });

      res.json({
        status: 200,
        message: 'Success',
        totalCount: transactions.count.length,
        items: transactions.rows
      });
    } catch (error) {
      next(error);
    }
  };

  static getOneTransaction = async (
    req: TransactionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const result = await TransactionQuery.getOneTransaction({
        id: Number(id)
      });

      res.json({
        status: 200,
        message: 'Success',
        transaction: result
      });
    } catch (error) {
      next(error);
    }
  };
}
