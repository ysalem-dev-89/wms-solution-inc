import axios from './axios';

export const getOneProduct = ({ id }: { id: number }) => {
  return axios.get(`products/${id}`);
};

export const getProductsByTitle = ({ title }: { title: string }) => {
  return axios.get(`/products/search?title=${title}`);
};
