import { ReactNode, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

const RefreshTokenWrapper = ({ children }: { children: ReactNode }) => {
  const session = useSession();

  useEffect(() => {
    if (session.data?.error?.code === 10005) {
      signIn();
    }
  }, [session]);

  return <>{children}</>;
};

export default RefreshTokenWrapper;
