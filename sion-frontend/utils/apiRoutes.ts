export const apiRoutes = {
  startResetPassword: `${process.env.NEXT_PUBLIC_API_URL}/authentication/startResetPassword`,
  resetPassword: `${process.env.NEXT_PUBLIC_API_URL}/authentication/resetPassword`,
  registration: `${process.env.NEXT_PUBLIC_API_URL}/authentication/register`,
  resendVerification: `${process.env.NEXT_PUBLIC_API_URL}/authentication/resendVerification`,
  verification: `${process.env.NEXT_PUBLIC_API_URL}/authentication/verify`,

  users: `${process.env.NEXT_PUBLIC_API_URL}/users`,

  categoryGroups: `${process.env.NEXT_PUBLIC_API_URL}/categories/categoryGroups`,
  categories: `${process.env.NEXT_PUBLIC_API_URL}/categories/categories`,

  createAuction: `${process.env.NEXT_PUBLIC_API_URL}/auctions`,
  uploadItemImages: `${process.env.NEXT_PUBLIC_API_URL}/items/images`,
};
