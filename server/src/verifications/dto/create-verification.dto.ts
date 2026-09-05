import { VerificationType } from '../enums/verification-type.enum.js';

export class CreateVerificationDto {
  valueHash: string;
  type: VerificationType;
  userId: number;
  expiresAt: Date;
}
