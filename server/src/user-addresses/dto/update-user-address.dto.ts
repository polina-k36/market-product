import { PartialType } from '@nestjs/swagger';
import { CreateUserAddressDto } from './create-user-address.dto.js';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
