import { Module } from '@nestjs/common';
import { SafeAreaService } from './safe-area.service';
import { SafeAreaController } from './safe-area.controller';

@Module({
  controllers: [SafeAreaController],
  providers: [SafeAreaService],
})
export class SafeAreaModule {}
