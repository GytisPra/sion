import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (token?.error) {
        return false;
      }

      if (req.nextUrl.pathname.startsWith('/auctioncreation')) {
        return !!token;
      }

      return true;
    },
  },
  pages: {
    signIn: '/authentication/login',
  },
});
