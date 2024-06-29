import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import {
  ActionButton,
  AsyncError,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  Paragraph,
  Subtitle,
} from '@components/Authentication';
import SionError from '@interfaces/error';
import { routes } from '@utils/routes';
import { apiRoutes } from '@utils/apiRoutes';

const StyledVerificationForm = styled.form`
  margin-top: 4.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const defaultValues = {
  email: '',
};

interface IResetPasswordData {
  email: string | string[] | undefined;
}

const startResetPasswordRequest = async (data: IResetPasswordData) => {
  const response = await axios.post(
    `${apiRoutes.startResetPassword}/${data.email}`,
  );

  return response.data;
};

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('Įveskite el. paštą.')
          .required('El. paštas turi būti užpildytas.'),
      }),
    ),
  });

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<SionError>,
    IResetPasswordData
  >(async (verificationData) => startResetPasswordRequest(verificationData), {
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
      router.push(routes.resetPasswordStarted);
      reset();
    },
  });

  const onSubmit = async (data: typeof defaultValues) => {
    mutation.mutate(data);
  };

  return (
    <>
      <StyledVerificationForm onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationFormInputGroup
          focused={dirtyFields.email}
          label='El. paštas'
          name='email'
          register={register}
          error={errors.email}
          type='email'
        />

        <ActionButton label='Tęsti' disabled={false} />

        <AsyncError>{asyncError}</AsyncError>
      </StyledVerificationForm>

      <LoadingIndicator loading={loading} />
    </>
  );
};

const ResetPassword = () => {
  return (
    <AuthenticationLayout>
      <Subtitle>Atkurkite slaptažodį</Subtitle>
      <Paragraph>
        Įveskite el. pašto adresą, kuriuo buvo registruota Jūsų paskyra
      </Paragraph>
      <ResetPasswordForm />
    </AuthenticationLayout>
  );
};

export default ResetPassword;
