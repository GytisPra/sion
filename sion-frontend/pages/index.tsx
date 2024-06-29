import type { GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Layout } from '@components/common';
import { routes } from '@utils/routes';

const Home = () => {
  const session = useSession();

  return (
    <Layout>
      <main>Apricot app</main>
      {session.status === 'authenticated' && (
        <>
          Signed in {session.data.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <Link href={routes.login}>Login</Link>
      <section style={{ height: '100vh' }}>Section 1</section>
      <section style={{ height: '100vh' }}>Section 2</section>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale || 'lt';

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'header',
        'common',
        'itemcard',
        'footer',
      ])),
      session: await getSession(ctx),
    },
  };
};

export default Home;
