import { useState, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

interface IUserAuthenticationState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const defaultUserAuthenticationState: IUserAuthenticationState = {
  accessToken: null,
  isAuthenticated: false,
};

const authenticationAtom = atom({
  key: 'authenticationState',
  default: defaultUserAuthenticationState,
});

export const useAuthenticationState = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [authentication, setAuthentication] =
    useRecoilState(authenticationAtom);

  useEffect(() => {
    setIsInitial(false);
  }, [authentication]);

  let userAuthenticationState: IUserAuthenticationState = {
    accessToken: null,
    isAuthenticated: false,
  };

  if (!isInitial) {
    const accessToken = localStorage.getItem('ath');

    userAuthenticationState = {
      accessToken,
      isAuthenticated: !!accessToken,
    };
  }

  return [
    isInitial === true
      ? defaultUserAuthenticationState
      : userAuthenticationState,
    setAuthentication,
  ] as const;
};
