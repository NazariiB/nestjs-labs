import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Get()
  @Render('index')
  async findAllForRendering(@Query('id') id?: string): Promise<any> {
    if (id) {
      const devices = await this.findAll(id);
      return { devices };
    } else {
      const devices = await this.deviceService.findAllOnServer();
      return { devices };
    }
  }

  @Post()
  @Render('index')
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    await this.deviceService.create(createDeviceDto);
    const devices = await this.deviceService.findAllOnServer();
    return { devices };
  }

  @Post('delete/:id')
  @Render('index')
  async deleteDevice(@Param('id') id: string) {
    await this.deviceService.delete(+id);
    const devices = await this.deviceService.findAllOnServer();
    return { devices };
  }

  @Post('stop/:id')
  stopDevice(@Param('id') id: string) {
    return this.deviceService.stopDevice(+id);
  }

  @Post('start/:id')
  startDevice(@Param('id') id: string) {
    return this.deviceService.startDevice(+id);
  }

  @Get('user/')
  findAll(@Query('id') id: string) {
    return this.deviceService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Post('update/')
  @Render('index')
  async update(@Body() updateDeviceDto: UpdateDeviceDto) {
    await this.deviceService.update(updateDeviceDto.id, updateDeviceDto);

    const devices = await this.deviceService.findAllOnServer();
    return { devices };
  }
}
