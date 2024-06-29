import { useQuery } from 'react-query';

import { authAxios } from '@helpers/authAxios';
import { apiRoutes } from '@utils/apiRoutes';
import { SionError, Category } from '@interfaces/index';

export const getCategoryGroups = async () => {
  const { data } = await authAxios.get<Category[]>(apiRoutes.categoryGroups);
  return data;
};

const useCategoryGroups = () => {
  return useQuery<Category[], SionError>(
    'getCategoryGroups',
    getCategoryGroups,
  );
};

export default useCategoryGroups;
