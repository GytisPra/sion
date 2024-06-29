import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { useMutation } from 'react-query';

import {
  ActionButton,
  AsyncError,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  Paragraph,
  Subtitle,
} from '@components/Authentication';
import { apiRoutes } from '@utils/apiRoutes';
import { routes } from '@utils/routes';
import { SionUser, SionError } from '@interfaces/index';

const StyledAccountDetailsForm = styled.form`
  margin-top: 4.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const defaultValues = {
  username: '',
  phone: '',
};

interface IAccountDetailsData {
  userId: string | string[] | undefined;
  username: string;
  phone: string;
}

const accountDetailsRequest = async (data: IAccountDetailsData) => {
  return await axios.put(`${apiRoutes.users}/${data.userId}/accountDetails`, {
    username: data.username,
    phone: data.phone,
  });
};

const AccountDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const router = useRouter();
  const { userId } = router.query;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, dirtyFields, errors },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(
      yup.object({
        username: yup
          .string()
          .min(4, 'Vartotojo vardas negali būti trumpesnis nei 4 simboliai.')
          .max(16, 'Vartotojo vardas negali būti ilgesnis nei 16 simbolių.')
          .required('Įveskite vartotojo vardą.'),
        // city: yup
        //   .string()
        //   .matches(/^[aA-zZ\s]+$/, 'Prašome įvesti tik raides.')
        //   .required('Įveskite miestą.'),
        phone: yup.string().required('Įveskite telefono numerį.'),
      }),
    ),
  });

  const mutation = useMutation<
    AxiosResponse<SionUser>,
    AxiosError<SionError>,
    IAccountDetailsData
  >(async (accountDetailsData) => accountDetailsRequest(accountDetailsData), {
    onMutate: () => {
      setLoading(true);
      setAsyncError('');
    },

    onError: (error) => {
      switch (error.response?.data.code) {
        case 20000:
          setAsyncError('Neteisingas patvirtinimo kodas.');
          break;
        default:
          setAsyncError('Nenumatyta klaida.');
      }
    },

    onSettled: () => {
      setLoading(false);
    },

    onSuccess: () => {
      router.push(routes.homepage);
      reset();
    },
  });

  const onSubmit = (data: typeof defaultValues) => {
    mutation.mutate({ ...data, userId });
  };

  return (
    <>
      <StyledAccountDetailsForm onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationFormInputGroup
          focused={dirtyFields.username}
          label='Vartotojo vardas'
          name='username'
          register={register}
          error={errors.username}
          type='text'
        />
        {/* <AuthenticationFormInputGroup
          focused={dirtyFields.city}
          label='Miestas'
          name='city'
          register={register}
          error={errors.city}
          type='text'
        /> */}
        <AuthenticationFormInputGroup
          focused={dirtyFields.phone}
          label='Tel. numeris'
          name='phone'
          register={register}
          error={errors.phone}
          type='text'
        />

        <ActionButton
          label='Baigti registraciją'
          disabled={!isDirty || !isValid}
        />

        <AsyncError>{asyncError}</AsyncError>
      </StyledAccountDetailsForm>
      <LoadingIndicator loading={loading} />
    </>
  );
};

const AccountDetails = () => {
  return (
    <AuthenticationLayout>
      <Subtitle>Sukurkite savo paskyrą</Subtitle>
      <Paragraph>
        Jūsų paskyros įvaizdis yra svarbus veiksnys pardavimams ir komunikacijai
        Pikensel platformoje
      </Paragraph>

      <AccountDetailsForm />
    </AuthenticationLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;

  if (!userId) {
    return {
      redirect: {
        destination: routes.homepage,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AccountDetails;
