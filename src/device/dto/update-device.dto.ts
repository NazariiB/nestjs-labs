import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { DeepPartial } from 'typeorm';
import { SafeArea } from 'src/safe-area/entities/safe-area.entity';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  id?: number;
  areaId?: DeepPartial<SafeArea>;
  status?: string;
  date?: Date;
  model?: string;
  location?: string;
}
