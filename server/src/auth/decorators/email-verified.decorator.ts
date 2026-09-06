import { SetMetadata } from '@nestjs/common';

export const EMAIL_VERIFIED_KEY = 'email_verifications';

export const EmailVerified = (verified: boolean) =>
  SetMetadata(EMAIL_VERIFIED_KEY, verified);
