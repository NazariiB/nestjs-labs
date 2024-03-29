import { Device } from "src/device/entities/device.entity";
import { DeepPartial } from "typeorm";

export class CreateMessageDto {
  data: string;
  date: Date;
  type: string;
  deviceId: DeepPartial<Device>;
}
