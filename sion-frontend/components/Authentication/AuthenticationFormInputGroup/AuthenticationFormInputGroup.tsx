import { useState } from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

import { PasswordEye } from '@assets/icons';

const StyledAuthenticationFormInputGroup = styled.div`
  position: relative;
`;

const AuthenticationFormInputLabel = styled.label<{
  focused: boolean;
  error: boolean;
}>`
  position: absolute;
  left: 0;
  top: 6px;
  left: 0.75rem;
  font-size: 1.125rem;
  color: ${(props) =>
    props.error ? props.theme.colors.red : props.theme.colors.disabled};
  z-index: 10;
  transition: transform 150ms ease-out, font-size 150ms ease-out;

  ${(props) =>
    props.focused &&
    `transform: translateY(-125%);
    font-size: 0.75em;
    font-weight: 600;
    color: ${props.error ? props.theme.colors.red : props.theme.colors.accent};
    `}
`;

const AuthenticationFormInput = styled.input<{ error: boolean }>`
  height: 35px;
  width: 100%;
  position: relative;

  background-color: ${(props) => props.theme.colors.lightblue};
  outline: none;

  border: none;
  box-shadow: 0 1px 0 0
    ${(props) =>
      props.error ? props.theme.colors.red : props.theme.colors.accent};

  padding: 0 0.75rem;
  font-size: 1.125rem;
  color: ${(props) =>
    props.error ? props.theme.colors.red : props.theme.colors.accent};
`;

const AuthenticationFormInputError = styled.p`
  color: red;
  text-align: right;
  font-size: 0.75rem;
`;

const StyledPasswordEye = styled.div<{ isToggled: boolean }>`
  float: right;
  margin-left: -30px;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.isToggled &&
    `${PasswordEye} {
      path {
        fill-opacity: 1;
      }
    }
  `}
`;

const AuthenticationFormInputGroup = <
  TFormValues extends Record<string, unknown>,
>({
  focused = false,
  label,
  name,
  register,
  error,
  type,
}: {
  focused?: boolean;
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  type: string;
}) => {
  const [revealed, setRevealed] = useState(false);

  const revealField = () => {
    setRevealed(!revealed);
  };
  return (
    <StyledAuthenticationFormInputGroup>
      <AuthenticationFormInputLabel
        focused={focused}
        htmlFor={name}
        error={!!error}
      >
        {label}
      </AuthenticationFormInputLabel>
      <AuthenticationFormInput
        id={name}
        type={type === 'password' ? (revealed ? 'text' : 'password') : type}
        error={!!error}
        spellCheck={false}
        {...register(name)}
      />
      {type === 'password' && (
        <StyledPasswordEye isToggled={revealed} onClick={revealField}>
          <PasswordEye />
        </StyledPasswordEye>
      )}
      <AuthenticationFormInputError>
        {error?.message}
      </AuthenticationFormInputError>
    </StyledAuthenticationFormInputGroup>
  );
};

export default AuthenticationFormInputGroup;
