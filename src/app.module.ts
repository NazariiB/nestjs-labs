import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { MessageModule } from './message/message.module';
import { SafeAreaModule } from './safe-area/safe-area.module';

@Module({
  imports: [UserModule, DeviceModule, MessageModule, SafeAreaModule],
})
export class AppModule {}
