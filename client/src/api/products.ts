import axios from './axios';
import { ProductInterface } from '../interfaces/ProductInterface';

export const getAllProductsAPI = (limit: number, offset: number) =>
  axios.get('/api/v1/products', { params: { limit, offset } });

export const updateProductAPI = (id: number, updateProduct: ProductInterface) =>
  axios.put(`/api/v1/products/${id}`, updateProduct);

export const deleteProductAPI = (id: number) =>
  axios.delete(`/api/v1/products/${id}`);
