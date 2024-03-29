import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { MessageModule } from './message/message.module';
import { SafeAreaModule } from './safe-area/safe-area.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DeviceModule, MessageModule, SafeAreaModule, DatabaseModule],
})
export class AppModule {}
