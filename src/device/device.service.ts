import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceRepository } from './device.repository';
import { SafeArea } from 'src/safe-area/entities/safe-area.entity';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    private deviceRepo: DeviceRepository
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    const device = this.deviceRepo.create(createDeviceDto);
    const area = new SafeArea();
    area.id = +createDeviceDto.areaId;
    device.area = area;
    return this.deviceRepo.save(device);
  }

  findAll(id: number) {
    const area = new SafeArea();
    area.id = id;
    return this.deviceRepo.findBy({ area });
  }

  findAllOnServer() {
    return this.deviceRepo.find();
  }

  findOne(id: number) {
    return this.deviceRepo.findOneBy({
      id
    });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = this.deviceRepo.create(updateDeviceDto);
    const area = new SafeArea();
    area.id = updateDeviceDto.areaId.id;
    device.area = area;
    return this.deviceRepo.update({id}, device);
  }

  stopDevice(id: number) {
    this.deviceRepo.query(`update device set status='pause' where id=${id}`);
    return;
  }

  startDevice(id: number) {
    this.deviceRepo.query(`update device set status='ok' where id=${id}`);
    return;
  }

  delete(id: number) {
    return this.deviceRepo.delete({
      id,
    });
  }
}
