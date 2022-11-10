import axios from './axios';

export const getOneProduct = ({ id }: { id: number }) => {
  return axios.get(`/api/v1/products/${id}`);
};

export const getProductsByTitle = ({ title }: { title: string }) => {
  return axios.get(`/api/v1/products/search?title=${title}`);
};
