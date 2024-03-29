import { Injectable } from '@nestjs/common';
import { CreateSafeAreaDto } from './dto/create-safe-area.dto';
import { UpdateSafeAreaDto } from './dto/update-safe-area.dto';
import { SafeAreaRepository } from './safe-area.repository';
import { SafeArea } from './entities/safe-area.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SafeAreaService {
  constructor(
    private safeAreaRepo: SafeAreaRepository,
  ) {}

  create(area: CreateSafeAreaDto) {
    return this.safeAreaRepo.save(area);
  }

  findAll(id: number) {
    return this.safeAreaRepo.query(`select * from safe_area where user_id = ${id}`);
  }

  findOne(id: number) {
    return this.safeAreaRepo.query('select * from safe_area where id = ' + id);
  }

  update(id: number, updateSafeAreaDto: UpdateSafeAreaDto) {
    return this.safeAreaRepo.update(id, updateSafeAreaDto);
  }

  remove(id: number) {
    return this.safeAreaRepo.delete(id);
  }
}
