import { SearchUser } from '../interfaces/SearchUserInterface';
import User from '../models/UserModel';
import Transaction from '../models/TransactionModel';
import { Role } from '../interfaces/UserInterface';
import { Op } from 'sequelize';
import { sequelize } from '../db/connection';
export default class UserQuery {
  static getUser = ({ filter, attributes }: SearchUser) =>
    User.findOne({ where: filter, attributes: attributes, raw: true });

  static createNewUser = async ({
    username,
    password,
    email,
    role
  }: {
    username: string;
    password: string;
    email: string;
    role: Role;
  }) => {
    return User.create(
      { username, password, email, role },
      {
        returning: true
      }
    );
  };
  static updateOneUser = async ({
    id,
    username,
    password,
    email,
    role
  }: {
    id: number;
    username: string;
    password: string;
    email: string;
    role: Role;
  }) => {
    return User.update(
      { username, password, email, role },
      {
        where: {
          id
        },
        returning: true
      }
    );
  };

  static deleteOneUser = async (id: number) => {
    return User.destroy({
      where: {
        id
      }
    });
  };

  static getUsers = async ({
    search,
    limit,
    offset
  }: {
    search: string;
    limit: number;
    offset: number;
  }) => {
    return User.findAndCountAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('username')), {
        [Op.like]: `%${search.toLowerCase()}%`
      }),
      attributes: [
        'User.id',
        'username',
        'password',
        'email',
        'role',
        'User.createdAt',
        [
          sequelize.fn('count', sequelize.col('Transactions.issuedBy')),
          'transactionsCount'
        ]
      ],
      include: [
        {
          model: Transaction,
          attributes: [],
          duplicating: false
        }
      ],
      order: [['id', 'DESC']],
      group: [
        'username',
        'User.id',
        'password',
        'email',
        'role',
        'User.createdAt'
      ],
      raw: true,
      limit,
      offset
    });
  };
}
