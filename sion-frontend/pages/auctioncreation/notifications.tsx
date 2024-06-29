import { ReactElement, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  AuctionCreationLayout,
  Button,
  FormCheckbox,
  FormRadioButton,
  FormSubtitle,
  StepButton,
  StepTitleSection,
} from '@components/AuctionCreation';
import {
  auctionCreationAtom,
  auctionCreationStateForRequest,
} from '@state/auctionCreation';
import { useCreateAuction } from '@hooks/mutations/auctions';
import { AsyncError, LoadingIndicator } from '@components/Authentication';

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.25rem;
`;

const StyledFormCheckbox = styled(FormCheckbox)`
  margin-bottom: 1rem;
`;

const StyledFormRadioButton = styled(FormRadioButton)`
  margin-bottom: 1rem;
`;

const notificationsOptions = [
  {
    label: 'Iki aukciono pabiagos liks 24 val.',
    value: '24h',
  },
  {
    label: 'Iki aukciono pabaigos liks 1 val.',
    value: '1h',
  },
  {
    label: 'Iki auckiono pabaigos liks 5 min.',
    value: '5min',
  },
  {
    label: 'Aktyvuojasi Didysis aukcionas',
    value: 'grandAuctionNotification',
  },
];

const receiveNotificationsOptions = [
  {
    label: 'Į el.paštą ir Pikensel paskyrą',
    value: 'email-and-account',
  },
  {
    label: 'Tik į el.paštą',
    value: 'email',
  },
  {
    label: 'Tik į Pikensel paskyrą',
    value: 'account',
  },
];

type FormValues = {
  '24h': boolean;
  '1h': boolean;
  '5min': boolean;
  grandAuction: boolean;
};

const NotificationsPage = () => {
  const [asyncError, setAsyncError] = useState('');

  const { handleSubmit } = useFormContext<FormValues>();
  const setAuctionCreationState = useSetRecoilState(auctionCreationAtom);
  const auctionCreationData = useRecoilValue(auctionCreationStateForRequest);
  const router = useRouter();

  const mutation = useCreateAuction();

  const onSubmit = (data: FormValues) => {
    const notifications: FormValues = {
      '24h': data['24h'],
      '1h': data['1h'],
      '5min': data['5min'],
      grandAuction: data.grandAuction,
    };

    setAuctionCreationState((prevData) => ({ ...prevData, notifications }));

    mutation.mutate(auctionCreationData, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        switch (error.response?.data.code) {
          case 20003:
            setAsyncError('Vartotojas su šiuo el.paštu jau egzistuoja.');
            break;
          default:
            setAsyncError('Nenumatyta klaida.');
        }
      },
    });
  };

  return (
    <>
      <StepTitleSection
        title='Mokamos paslaugos'
        subtitle='Pasirinkite papildomas paslaugas savo prekei.'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSubtitle>Gauti pranešimus, kai</FormSubtitle>
        {notificationsOptions.map((option) => (
          <StyledFormCheckbox key={option.value} name={option.value}>
            {option.label}
          </StyledFormCheckbox>
        ))}

        <FormSubtitle>Kur norite gauti pranešimus?</FormSubtitle>
        {receiveNotificationsOptions.map((option) => (
          <StyledFormRadioButton key={option.value} name={option.value}>
            {option.label}
          </StyledFormRadioButton>
        ))}
        <ActionButtons>
          <StepButton />
          <Button>Užbaigti</Button>
        </ActionButtons>

        <AsyncError>{asyncError}</AsyncError>
      </form>
      <LoadingIndicator loading={mutation.isLoading} />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['auctioncreation', 'itemcard'])),
  },
});

NotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuctionCreationLayout>{page}</AuctionCreationLayout>;
};

export default NotificationsPage;
