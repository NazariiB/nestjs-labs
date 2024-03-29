import { Module } from '@nestjs/common';
import { SafeAreaService } from './safe-area.service';
import { SafeAreaController } from './safe-area.controller';
import { SafeAreaRepository } from './safe-area.repository';
import { SafeArea } from './entities/safe-area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SafeArea])],
  controllers: [SafeAreaController],
  providers: [SafeAreaService, SafeAreaRepository, SafeArea],
})
export class SafeAreaModule {}
