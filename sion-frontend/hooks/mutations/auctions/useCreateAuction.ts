import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { apiRoutes } from '@utils/apiRoutes';
import { AuctionCreationStateForRequest } from '@state/auctionCreation';
import { authAxios } from '@helpers/authAxios';
import { SionError } from '@interfaces/index';

export const createAuctionRequest = async (
  payload: AuctionCreationStateForRequest,
) => {
  const { data } = await authAxios.post(apiRoutes.createAuction, payload);

  const formData = new FormData();
  payload.images.forEach((image) => formData.append('images', image));

  const { data: uploadImagesData } = await authAxios.post(
    `${apiRoutes.uploadItemImages}/${data.item.id}`,
    formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  );

  return uploadImagesData;
};

type SionPublicFile = {
  id: string;
  url?: string;
  key: string;
  data?: Uint8Array;
};

type SionImage = SionPublicFile & {
  itemId?: string;
};

type SionAuction = {
  id: string;
  userId: string;
  brand: string;
  categoryGroupId: string;
  categoryId: string;
  subcategoryId?: string;
  createdAt: Date;
  updatedAt: Date;
  images: SionImage[];
};

const useCreateAuction = () => {
  return useMutation<
    AxiosResponse<SionAuction>,
    AxiosError<SionError>,
    AuctionCreationStateForRequest
  >((payload: AuctionCreationStateForRequest) => {
    return createAuctionRequest(payload);
  });
};

export default useCreateAuction;
