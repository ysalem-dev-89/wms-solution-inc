import axios from './axios';

export const monthlyRevenue = (year: number) => {
  return axios.get(`/analytics/revenue/${year}`);
};

export const totalStatistics = () => {
  return axios.get(`/analytics/total`);
};

export const topSelling = () => {
  return axios.get(`/analytics/topselling`);
};

export const stockAlert = ({
  limit,
  offset
}: {
  limit: number;
  offset: number;
}) => {
  return axios.get(`/analytics/stockalert?limit=${limit}&offset=${offset}`);
};
