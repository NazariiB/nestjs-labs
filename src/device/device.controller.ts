import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Post(':id')
  setUpDevice(@Param('id') id: string) {
    // fancy logic with communication between server, device and user app
    return 'ok';
  }

  @Post('stop/:id')
  stopDevice(@Param('id') id: string) {
    return this.deviceService.stopDevice(+id);
  }

  @Post('start/:id')
  startDevice(@Param('id') id: string) {
    return this.deviceService.startDevice(+id);
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.deviceService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }
}
