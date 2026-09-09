import { PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './create-user-card.dto.js';

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {}
