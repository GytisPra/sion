import { ResetPasswordToken } from '../../../authentication/resetPasswordToken.entity';

export const plainResetPasswordToken: ResetPasswordToken = {
  id: 1,
  userId: 'test',
  token: 'ResetPasswordToken',
  expiresAt: null,
};
