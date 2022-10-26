import axios from './axios';

export const search = ({
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

export const create = (name: string) => {
  return axios.post(`/categories`, { name });
};

export const update = ({ id, name }: { id: number; name: string }) => {
  return axios.put(`/categories/${id}`, { name });
};

export const remove = (id: number) => {
  return axios.delete(`/categories/${id}`);
};
