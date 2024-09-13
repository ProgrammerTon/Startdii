import { PartialType } from '@nestjs/mapped-types';
import { CreateGuildDto } from './create-guild.dto';

export class UpdateGuildDto extends PartialType(CreateGuildDto) {}
