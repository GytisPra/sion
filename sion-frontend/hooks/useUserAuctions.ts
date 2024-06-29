import { useQuery } from 'react-query';

import { authAxios } from '@helpers/authAxios';

const getUserAuctions = async (userId: number) => {
  const { data } = await authAxios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auctions/users/${userId}`,
  );

  return data;
};

export const useUserAuctions = (userId: number) => {
  return useQuery(['userAuctions', userId], () => getUserAuctions(userId));
};
