import styled from 'styled-components';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import {
  Header,
  ItemCardPreview,
  MenuDrawer,
  TitleSection,
} from '@components/AuctionCreation';
import { MobileHeader } from '@components/common';
import { auctionCreationAtom } from '@state/auctionCreation';

const StyledAuctionCreation = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainSection = styled.div`
  width: 93%;
  margin: 0 0 1rem auto;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: grid;
    width: 100%;

    grid-template-columns: 15.5% 2.25% 49% 5% auto;
    grid-template-rows: 7.25rem auto;
  }
`;

const AuctionForm = styled.main`
  grid-row: 2;
  grid-column: 3;
`;

const AuctionCreationLayout = ({ children }: { children: ReactNode }) => {
  const auctionCreationState = useRecoilValue(auctionCreationAtom);
  const { pathname } = useRouter();

  const step = pathname.split('/')[2];

  const descriptionSchema = yup.object({
    title: yup.string().required(),
    brand: yup.string().required(),
    categoryGroup: yup.string().required(),
    category: yup.string().required(),
    condition: yup.string().required(),
    description: yup.string().required(),
    photos: yup.array().min(2).required(),
  });

  const priceSchema = yup.object({
    price: yup.number().required(),
    buyNowPriceToggle: yup.boolean(),
    buyNowPrice: yup.number().when('buyNowPriceToggle', {
      is: true,
      then: yup
        .number()
        .required()
        .typeError('The field must contain a number'),
      otherwise: yup
        .number()
        .transform(() => {
          return null;
        })
        .nullable()
        .notRequired(),
    }),
  });

  const durationSchema = yup.object({
    durationInDays: yup.string().required(),
    durationInHours: yup.string().required(),
    startNowToggle: yup.boolean(),
    startDate: yup.date().when('startNowToggle', {
      is: true,
      then: yup.date().required(),
    }),
    startHour: yup.number().when('startNowToggle', {
      is: true,
      then: yup.number().required(),
    }),
    autoExtend: yup.boolean(),
    grandAuction: yup.boolean(),
  });

  const notificationsSchema = yup.object({});

  const validationSchema = {
    description: descriptionSchema,
    price: priceSchema,
    duration: durationSchema,
    notifications: notificationsSchema,
  };

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  /* @ts-ignore: */
  const currentValidationSchema = validationSchema[step];

  const methods = useForm({
    defaultValues: auctionCreationState,
    resolver: async (data, context, options) => {
      return yupResolver(currentValidationSchema)(data, context, options);
    },
  });

  return (
    <FormProvider {...methods}>
      <StyledAuctionCreation>
        <Header />
        <MobileHeader />
        <MainSection>
          <MenuDrawer />
          <TitleSection />
          <AuctionForm>{children}</AuctionForm>
          <ItemCardPreview />
        </MainSection>
      </StyledAuctionCreation>
    </FormProvider>
  );
};

export default AuctionCreationLayout;
