import { PartialType } from '@nestjs/mapped-types';
import { CreateSafeAreaDto } from './create-safe-area.dto';

export class UpdateSafeAreaDto extends PartialType(CreateSafeAreaDto) {}
