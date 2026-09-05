import { VerificationMethod } from '../enums/verification-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';

export class CreateVerificationDto {
  valueHash: string;
  type: VerificationType;
  method: VerificationMethod;
  userId: number;
  expiresAt: Date;
}
