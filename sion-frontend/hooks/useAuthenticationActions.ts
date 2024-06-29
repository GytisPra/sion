import { useSetRecoilState } from 'recoil';

import { useAuthenticationState, userAtom } from '@state/index';
import { authAxios } from '@helpers/authAxios';

export const useAuthenticationActions = () => {
  const [, setAuthentication] = useAuthenticationState();
  const setUser = useSetRecoilState(userAtom);

  const removeAuthentication = () => {
    localStorage.removeItem('ath');
    setAuthentication({ accessToken: null, isAuthenticated: false });
  };

  const login = async (email: string, password: string) => {
    const { data: loginResponse } = await authAxios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    localStorage.setItem('ath', loginResponse.accessToken);
    setAuthentication({
      accessToken: loginResponse.accessToken,
      isAuthenticated: true,
    });

    try {
      const { data: authenticationResponse } = await authAxios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication`,
      );
      setUser(authenticationResponse);
    } catch (error) {
      removeAuthentication();
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await authAxios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/logout`,
      );
    } catch (error) {
      console.error(error);
    } finally {
      removeAuthentication();
    }
  };

  return {
    login,
    logout,
  };
};
