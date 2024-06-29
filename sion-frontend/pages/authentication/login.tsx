import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  ActionButton,
  AsyncError,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  SecondaryAction,
} from '@components/Authentication';
import { routes } from '@utils/routes';

const StyledLoginForm = styled.form`
  margin-top: 4.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('Įveskite el. paštą.')
          .required('El. paštas turi būti užpildytas.'),
        password: yup.string().required('Slaptažodis negali būti tuščias.'),
      }),
    ),
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setAsyncError('');

    const response = await signIn<'credentials'>('credentials', {
      redirect: false,
      callbackUrl:
        (router.query.callbackUrl as string) ||
        (process.env.NEXT_PUBLIC_HOMEPAGE as string),
      ...data,
    });

    if (response) {
      if (response.error) {
        switch (response.error) {
          case '20020':
          case '10004':
            setAsyncError('Neteisingas el.paštas arba slaptažodis');
            break;
          case '20012':
            setAsyncError('Pradėtas slaptažodžio atstatymas');
            break;
          default:
            setAsyncError('Nenumatyta klaida');
        }

        setLoading(false);
      } else if (response.url) {
        router.push(response.url);
      }
    }
  };

  const handleResetPassword = () => {
    router.push(routes.resetPassword);
  };

  return (
    <>
      <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationFormInputGroup
          focused={dirtyFields.email}
          label='El. paštas'
          name='email'
          register={register}
          error={errors.email}
          type='email'
        />

        <AuthenticationFormInputGroup
          focused={dirtyFields.password}
          label='Slaptažodis'
          name='password'
          register={register}
          error={errors.password}
          type='password'
        />

        <ActionButton label='Prisijungti' />

        <SecondaryAction onClick={handleResetPassword}>
          Pamiršote slaptažodį?
        </SecondaryAction>

        <AsyncError>{asyncError}</AsyncError>
      </StyledLoginForm>
      <LoadingIndicator loading={loading} />
    </>
  );
};

const Login = () => {
  return (
    <AuthenticationLayout title='Prisijungti'>
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default Login;
