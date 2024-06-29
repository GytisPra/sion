import { useQuery } from 'react-query';

import { authAxios } from '@helpers/authAxios';
import { apiRoutes } from '@utils/apiRoutes';
import { SionError, Category } from '@interfaces/index';

export const getCategories = async () => {
  const { data } = await authAxios.get<Category[]>(apiRoutes.categories);
  return data;
};

const useCategories = () => {
  return useQuery<Category[], SionError>('getCategories', getCategories, {
    staleTime: 15 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
};

export default useCategories;
