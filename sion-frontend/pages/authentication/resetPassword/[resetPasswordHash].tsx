import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import zxcvbn from 'zxcvbn';

import {
  ActionButton,
  AsyncError,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  PasswordStrengthBar,
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
  password: '',
  password2: '',
};

interface IResetPasswordData {
  password: string | string[] | undefined;
  resetPasswordHash: string | string[] | undefined;
}

const resetPasswordRequest = async (data: IResetPasswordData) => {
  const response = await axios.post(
    `${apiRoutes.resetPassword}/${data.resetPasswordHash}`,
    { password: data.password },
  );

  return response.data;
};

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const router = useRouter();
  const { resetPasswordHash } = router.query;

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
    watch,
    setError,
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object({
        password: yup.string().required('Slaptažodis negali būti tuščias.'),
        password2: yup
          .string()
          .required('Slaptažodis negali būti tuščias.')
          .oneOf([yup.ref('password'), null], 'Slaptažodžiai turi sutapti.'),
      }),
    ),
  });

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<SionError>,
    IResetPasswordData
  >(async (resetPasswordData) => resetPasswordRequest(resetPasswordData), {
    onMutate: () => {
      setLoading(true);
      setAsyncError('');
    },

    onError: (error) => {
      switch (error.response?.data.code) {
        case 20000:
          setAsyncError(
            'Šiai paskyrai nepradėtas slaptažodžio atstatymo procesas.',
          );
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

  const onSubmit = async (data: typeof defaultValues) => {
    if (passwordStrength < 2) {
      setError('password', {
        type: 'manual',
        message: 'Slaptažodis per silpnas.',
      });

      return;
    }

    mutation.mutate({
      password: data.password,
      resetPasswordHash,
    });
  };

  const password = watch('password');
  const passwordStrength = zxcvbn(password).score;

  return (
    <>
      <StyledVerificationForm onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationFormInputGroup
          focused={dirtyFields.password}
          label='Įveskite naują slaptažodį'
          name='password'
          register={register}
          error={errors.password}
          type='password'
        />

        <AuthenticationFormInputGroup
          focused={dirtyFields.password2}
          label='Pakartokite slaptažodį'
          name='password2'
          register={register}
          error={errors.password2}
          type='password'
        />

        <PasswordStrengthBar
          strength={passwordStrength}
          active={dirtyFields.password && dirtyFields.password2}
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
    <AuthenticationLayout title=''>
      <h3>Atkurkite slaptažodį</h3>
      <p>
        Sukurkite naują slaptažodį. Šį kartą paprastesnį, tačiau ne per daug
        lengvą.
      </p>
      <ResetPasswordForm />
    </AuthenticationLayout>
  );
};

export default ResetPassword;
