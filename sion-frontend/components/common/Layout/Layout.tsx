import { ReactNode } from 'react';

import { Header, Navbar, Footer } from '@components/common';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
