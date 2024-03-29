import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserCredentials } from './dto/user-credentials.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
  ) {}
  
  async create(user: CreateUserDto) {
    await this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.query('select * from user');
  }

  async findOne(credentials: UserCredentials) {
    const res = await this.userRepo.query(`select * from user where name='${credentials.name}' and password='${credentials.password}'`);
    return !!res?.length;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
