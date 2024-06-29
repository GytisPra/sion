import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useMutation } from 'react-query';

import {
  ActionButton,
  AsyncError,
  AuthenticationFormInputGroup,
  AuthenticationLayout,
  LoadingIndicator,
  Paragraph,
  SecondaryAction,
  Subtitle,
} from '@components/Authentication';
import { SionError } from '@interfaces/index';
import { routes } from '@utils/routes';
import { apiRoutes } from '@utils/apiRoutes';

const StyledVerificationForm = styled.form`
  margin-top: 4.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface IVerificationData {
  code: string;
}

const verificationRequest = async (data: IVerificationData) => {
  const response = await axios.post(apiRoutes.verification, data);

  return response;
};

interface IResendVerificationData {
  email: string | string[] | undefined;
}

const resendVerificationRequest = async (data: IResendVerificationData) => {
  const response = await axios.get(
    `${apiRoutes.resendVerification}/${data.email}`,
  );

  return response;
};

const defaultValues = {
  code: '',
};

const VerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const [asyncError, setAsyncError] = useState('');

  const router = useRouter();
  const { userId, email } = router.query;

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
        code: yup
          .string()
          .matches(
            /^\d+$/,
            'Patvirtinimo kodas turi būti sudarytas iš skaičių.',
          )
          .length(6, 'Patvirtinimo kodas turi būti sudarytas iš 6 skaičių.')
          .required('Įveskite patvirtinimo kodą.'),
      }),
    ),
  });

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<SionError>,
    IVerificationData
  >(async (verificationData) => verificationRequest(verificationData), {
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
      router.push({
        pathname: routes.accountDetails,
        query: { userId },
      });
      reset();
    },
  });

  const onSubmit = async (data: typeof defaultValues) => {
    mutation.mutate(data);
  };

  const resendMutation = useMutation<
    AxiosResponse,
    AxiosError<SionError>,
    IResendVerificationData
  >(
    async (resendVerificationData) =>
      resendVerificationRequest(resendVerificationData),
    {
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
    },
  );

  const handleSendAgain = () => {
    resendMutation.mutate({ email });
  };

  return (
    <>
      <StyledVerificationForm onSubmit={handleSubmit(onSubmit)}>
        <AuthenticationFormInputGroup
          focused={dirtyFields.code}
          label='Patvirtinimo kodas'
          name='code'
          register={register}
          error={errors.code}
          type='text'
        />

        <ActionButton label='Patvirtinti' disabled={false} />

        <SecondaryAction onClick={handleSendAgain}>
          Siųsti dar kartą.
        </SecondaryAction>

        <AsyncError>{asyncError}</AsyncError>
      </StyledVerificationForm>
      <LoadingIndicator loading={loading} />
    </>
  );
};

const EmailVerification = () => {
  const router = useRouter();
  const email = router.query.email;

  return (
    <AuthenticationLayout>
      <Subtitle>Patvirtinkite savo el.pašto adresą</Subtitle>
      <Paragraph>
        Norėdami tęsti registraciją, patvirtinkite savo duomenis, suvedę kodą,
        kurį išsiuntemė <b>{email}</b> adresu
      </Paragraph>
      <VerificationForm />
    </AuthenticationLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const email = context.query.email;

  if (!email) {
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

export default EmailVerification;
