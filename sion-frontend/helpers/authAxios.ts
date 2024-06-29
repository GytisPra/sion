import axios from 'axios';
import { getSession } from 'next-auth/react';

const authAxios = axios.create();

authAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    };

    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  },
);

export { authAxios };
