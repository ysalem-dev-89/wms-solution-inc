import { TransactionProductInterface } from '../interfaces/TransactionProductInterface';
import axios from './axios';

export const createNewTransaction = ({
  type,
  issuedBy,
  transactionProducts
}: {
  type: string;
  issuedBy: number;
  transactionProducts: TransactionProductInterface[];
}) => {
  return axios.post(`/api/v1/transactions`, {
    type,
    issuedBy,
    transactionProducts
  });
};

export const updateOneTransaction = ({
  id,
  type,
  issuedBy,
  transactionProducts
}: {
  id: number;
  type: string;
  issuedBy: number;
  transactionProducts: TransactionProductInterface[];
}) => {
  return axios.put(`/api/v1/transactions/${id}`, {
    type,
    issuedBy,
    transactionProducts
  });
};

export const deleteOneTransaction = (id: number) => {
  return axios.delete(`/api/v1/transactions/${id}`);
};

export const getOneTransaction = ({ id }: { id: number }) => {
  return axios.get(`/api/v1/transactions/${id}`);
};

export const getTransactions = ({
  type,
  search,
  limit,
  offset
}: {
  type: string;
  search: string;
  limit: number;
  offset: number;
}) => {
  return axios.get(
    `/api/v1/transactions?search=${search}&type=${type}&limit=${limit}&offset=${offset}`
  );
};
