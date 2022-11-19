import { ProductInterface } from '../interfaces/ProductInterface';
import axios from './axios';

export const getAllProductsAPI = (limit: number, offset: number) =>
  axios.get('/api/v1/products', { params: { limit, offset } });

export const updateProductAPI = (id: number, updateProduct: ProductInterface) =>
  axios.put(`/api/v1/products/${id}`, updateProduct);

export const deleteProductAPI = (id: number) =>
  axios.delete(`/api/v1/products/${id}`);

export const getOneProduct = ({ id }: { id: number }) => {
  return axios.get(`/api/v1/products/${id}`);
};

export const getProductsByTitle = ({ title }: { title: string }) => {
  return axios.get(`/api/v1/products/search?title=${title}`);
};

export const getProducts = ({
  title,
  barcode,
  categoryId
}: {
  title: string;
  barcode: string;
  categoryId: string;
}) => {
  return axios.get(
    `/api/v1/products?title=${title}&barcode=${barcode}&categoryId=${categoryId}`
  );
};
