import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SafeAreaService } from './safe-area.service';
import { CreateSafeAreaDto } from './dto/create-safe-area.dto';
import { UpdateSafeAreaDto } from './dto/update-safe-area.dto';

@Controller('safe-area')
export class SafeAreaController {
  constructor(private readonly safeAreaService: SafeAreaService) {}

  @Post()
  create(@Body() createSafeAreaDto: CreateSafeAreaDto) {
    return this.safeAreaService.create(createSafeAreaDto);
  }

  @Get()
  findAll() {
    return this.safeAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.safeAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSafeAreaDto: UpdateSafeAreaDto) {
    return this.safeAreaService.update(+id, updateSafeAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.safeAreaService.remove(+id);
  }
}
