import { ThemeProvider } from 'styled-components';
import { appWithTranslation, SSRConfig } from 'next-i18next';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import { Head } from '@components/common';
import theme, { GlobalStyles } from '@assets/theme';

import './styles.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session } & SSRConfig> & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <Head />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {getLayout(<Component {...pageProps} />)}
            </RecoilRoot>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
