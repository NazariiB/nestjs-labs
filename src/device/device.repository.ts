import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SafeArea } from 'src/safe-area/entities/safe-area.entity';

@Injectable()
export class DeviceRepository extends Repository<Device> {
  private path = 'E:/documents/nestjs-app/src/DBInitialData/device.csv';

  constructor(
    @InjectRepository(Device)
    repository: Repository<Device>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async initDevices() {
    const newDevices = this.generateDevices();
    this.safeDevicesIntoCSV(newDevices);
    const devices = this.getDevicesFromCSV();

    await this.save(devices);
  }

  private safeDevicesIntoCSV(devices: string[]) {
    fs.writeFileSync(this.path, devices.join('\n'), {encoding:'utf-8'});
  }

  private getDevicesFromCSV() {
    const data = fs.readFileSync(this.path, {encoding: 'utf-8'});
    return data.split('\n').map(el => {
      const area = new SafeArea();
      const device = new Device();

      const deviceData = el.split(',');

      area.id = Number(deviceData[0]);
      device.area = area;
      device.status = deviceData[1];
      device.model = deviceData[3];
      device.location = deviceData[4];
      device.date = new Date(Number(deviceData[2]));

      return device;
    });
  }

  private generateDevices() {
    const devices = [];
    for(let i = 0; i <= 1000; i++) {
      const area = 
        Math.floor(Math.random() * 999 + 1) + ',' +
        (Math.random() * 10 > 3 ? 'ok' : 'paused')  + ',' +
        (new Date().getTime()) + ',' +
        '0.0.1,' + 
        '49.822066; 24.057709';
      devices.push(area);
    }
    return devices;
  }
}