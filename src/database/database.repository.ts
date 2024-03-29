import { INestApplication, Injectable } from "@nestjs/common";
import { DeviceRepository } from "src/device/device.repository";
import { MessageRepository } from "src/message/message.repository";
import { SafeAreaRepository } from "src/safe-area/safe-area.repository";
import { UserRepository } from "src/user/user.repository";
import { Repository } from "typeorm";

export class DatabaseRepository extends Repository<any> {
  public async innitData(
    app: INestApplication,
  ) {
    await app.get(UserRepository).initUsers();
    await app.get(SafeAreaRepository).initSafeArea();
    await app.get(DeviceRepository).initDevices();
    await app.get(MessageRepository).initMessage();
  }
}
