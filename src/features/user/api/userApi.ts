import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080';

export type UserType = {
  username: string;
};

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchUserById = async (userId: number): Promise<UserType> => {
  const response = await api.get(`/users/${userId}/name`);
  return response.data.result;
}; 