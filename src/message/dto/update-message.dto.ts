import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { DeepPartial } from 'typeorm';
import { Device } from 'src/device/entities/device.entity';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  data?: string;
  date?: Date;
  type?: string;
  deviceId?: DeepPartial<Device>;
}
