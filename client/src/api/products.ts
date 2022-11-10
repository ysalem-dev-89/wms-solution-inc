import axios from './axios';
import { ProductInterface } from '../interfaces/ProductInterface';

export const getAllProductsAPI = (limit: number, offset: number) =>
  axios.get('/products', { params: { limit, offset } });

export const updateProductAPI = (id: number, updateProduct: ProductInterface) =>
  axios.put(`/products/${id}`, updateProduct);

export const deleteProductAPI = (id: number) => axios.delete(`/products/${id}`);
