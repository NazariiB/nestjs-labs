import { PartialType } from '@nestjs/mapped-types';
import { CreateSafeAreaDto } from './create-safe-area.dto';
import { DeepPartial } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export class UpdateSafeAreaDto extends PartialType(CreateSafeAreaDto) {
  id?: number;
  userId?: DeepPartial<User>;
  name?: string;
  is_working?: boolean;
}
