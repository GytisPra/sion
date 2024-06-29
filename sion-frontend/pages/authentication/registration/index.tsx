import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import zxcvbn from 'zxcvbn';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import { SionError, SionUser } from '@interfaces/index';
import { routes } from '@utils/routes';
import {
  ActionButton,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  AsyncError,
  PasswordStrengthBar,
} from '@components/Authentication';
import { apiRoutes } from '@utils/apiRoutes';

const StyledRegistrationForm = styled.form`
  margin-top: 4.5rem;
`;

const RegistrationFormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface IRegistrationData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

const registerRequest = async (data: IRegistrationData) => {
  const response = await axios.post(apiRoutes.registration, data);

  return response;
};

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password2: '',
};

const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(
      yup.object({
        firstname: yup
          .string()
          .min(3, 'Vardas turi būti bent 3 simbolių')
          .max(20, 'Vardas negali būti ilgesnis nei 20 simbolių.')
          .required('Vardas turi būti užpildytas.'),
        lastname: yup
          .string()
          .min(3, 'Vardas turi būti bent 3 simbolių.')
          .max(20, 'Pavardė negali būti ilgesnė nei 20 simbolių.')
          .required('Pavardė turi būti užpildyta.'),
        email: yup
          .string()
          .email('Įveskite el. paštą.')
          .required('El. paštas turi būti užpildytas.'),
        password: yup.string().required('Slaptažodis negali būti tuščias.'),
        password2: yup
          .string()
          .required('Slaptažodis negali būti tuščias.')
          .oneOf([yup.ref('password'), null], 'Slaptažodžiai turi sutapti.'),
      }),
    ),
  });

  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const password = watch('password');
  const passwordStrength = zxcvbn(password).score;

  const router = useRouter();

  const mutation = useMutation<
    AxiosResponse<SionUser>,
    AxiosError<SionError>,
    IRegistrationData
  >(async (registrationData) => registerRequest(registrationData), {
    onMutate: () => {
      setLoading(true);
      setAsyncError('');
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

    onSettled: () => {
      setLoading(false);
    },

    onSuccess: (response) => {
      const { email, id } = response.data;

      router.push({
        pathname: routes.emailVerification,
        query: { email, userId: id },
      });
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

    mutation.mutate(data);
  };

  return (
    <>
      <StyledRegistrationForm onSubmit={handleSubmit(onSubmit)}>
        <RegistrationFormInputs>
          <AuthenticationFormInputGroup
            focused={dirtyFields.firstname}
            label='Vardas'
            name='firstname'
            register={register}
            error={errors.firstname}
            type='text'
          />

          <AuthenticationFormInputGroup
            focused={dirtyFields.lastname}
            label='Pavardė'
            name='lastname'
            register={register}
            error={errors.lastname}
            type='text'
          />

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

          <AuthenticationFormInputGroup
            focused={dirtyFields.password2}
            label='Pakartokite slaptažodį'
            name='password2'
            register={register}
            error={errors.password2}
            type='password'
          />
        </RegistrationFormInputs>

        <PasswordStrengthBar
          strength={passwordStrength}
          active={dirtyFields.password && dirtyFields.password2}
        />

        <ActionButton label='Registruotis' />

        <AsyncError>{asyncError}</AsyncError>
      </StyledRegistrationForm>
      <LoadingIndicator loading={loading} />
    </>
  );
};

const Registration = () => {
  return (
    <AuthenticationLayout title='Registruotis'>
      <RegistrationForm />
    </AuthenticationLayout>
  );
};

export default Registration;
