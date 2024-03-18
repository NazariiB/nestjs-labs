import { Injectable } from '@nestjs/common';
import { CreateSafeAreaDto } from './dto/create-safe-area.dto';
import { UpdateSafeAreaDto } from './dto/update-safe-area.dto';

@Injectable()
export class SafeAreaService {
  create(createSafeAreaDto: CreateSafeAreaDto) {
    return 'This action adds a new safeArea';
  }

  findAll() {
    return `This action returns all safeArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} safeArea`;
  }

  update(id: number, updateSafeAreaDto: UpdateSafeAreaDto) {
    return `This action updates a #${id} safeArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} safeArea`;
  }
}
