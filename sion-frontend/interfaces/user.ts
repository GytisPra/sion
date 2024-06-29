interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  karmaPoints: number;
  phone: string;
  roles: string[];
  level: string;
  isVerified: boolean;
  isResetPasswordStarted: boolean;
  verificationSentAt: Date;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
