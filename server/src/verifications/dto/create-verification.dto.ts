import { VerificationType } from '../enums/verification-type.enum.js';

export class CreateVerificationDto {
  tokenHash: string;
  type: VerificationType;
  userId: number;
  expiresAt: Date;
}
