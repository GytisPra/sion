import { useQuery } from 'react-query';

import { authAxios } from '@helpers/authAxios';

const getAuthenticatedUser = async () => {
  const { data } = await authAxios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/authentication`,
  );

  return data;
};

const useUser = () => {
  return useQuery('authenticatedUser', getAuthenticatedUser);
};

export default useUser;
