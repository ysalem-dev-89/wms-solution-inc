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
  return axios.get(
    `/api/v1/categories?name=${name}&limit=${limit}&offset=${offset}`
  );
};

export const createNewCategory = (name: string) => {
  return axios.post(`/api/v1/categories`, { name });
};

export const updateOneCategory = ({
  id,
  name
}: {
  id: number;
  name: string;
}) => {
  return axios.put(`/api/v1/categories/${id}`, { name });
};

export const deleteOneCategory = (id: number) => {
  return axios.delete(`/api/v1/categories/${id}`);
};
