import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../user-identities/enums/user-role.enum.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('ADMIN' | 'CLIENT')[]) =>
  SetMetadata(ROLES_KEY, roles);
