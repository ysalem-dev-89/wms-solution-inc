import axios from './axios';

export const getCategories = ({
  name,
  limit,
  offset
}: {
  name: string;
  limit: number;
  offset: number;
}) => {
  return axios.get(`categories?name=${name}&limit=${limit}&offset=${offset}`);
};

export const createNewCategory = (name: string) => {
  return axios.post(`/categories`, { name });
};

export const updateOneCategory = ({
  id,
  name
}: {
  id: number;
  name: string;
}) => {
  return axios.put(`/categories/${id}`, { name });
};

export const deleteOneCategory = (id: number) => {
  return axios.delete(`/categories/${id}`);
};
