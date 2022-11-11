import axios from './axios';

export const getUsers = ({
  search,
  limit,
  offset
}: {
  search: string;
  limit: number;
  offset: number;
}) => {
  return axios.get(
    `/api/v1/users?search=${search}&limit=${limit}&offset=${offset}`
  );
};

export const createNewUser = ({
  username,
  email,
  password,
  role
}: {
  username: string;
  email: string;
  password?: string;
  role: string;
}) => {
  return axios.post(`/api/v1/users`, { username, email, password, role });
};

export const udpateOneUser = ({
  id,
  username,
  email,
  password,
  role
}: {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: string;
}) => {
  console.log(password);
  return axios.put(`/api/v1/users/${id}`, { username, email, password, role });
};

export const deleteOneUser = (id: number) => {
  return axios.delete(`/api/v1/users/${id}`);
};
