import { PartialType } from '@nestjs/swagger';
import { CreateNdsDto } from './create-nds.dto.js';

export class UpdateNdsDto extends PartialType(CreateNdsDto) {}
