import { SafeArea } from "src/safe-area/entities/safe-area.entity";
import { DeepPartial } from "typeorm";

export class CreateDeviceDto {
  areaId: DeepPartial<SafeArea>;
  status: string;
  date: Date;
  model: string;
  location: string;
}
