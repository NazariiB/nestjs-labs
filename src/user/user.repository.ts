import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  private path = 'E:/documents/nestjs-app/src/DBInitialData/user.csv';
  private queryPath = 'E:/documents/nestjs-app/src/DBInitialData/dbCreation.sql';

  public async initUsers() {
    await this.recreateDB();
    const newUsers = this.generateUsers();
    this.safeUsersIntoCSV(newUsers);
    const users = this.getUsersFromCSV();
    await this.save(users);
  }

  public async recreateDB() {
    const query = fs.readFileSync(this.queryPath, { encoding: 'utf-8' });
    const queries = query.split('\n');
    for (let i = 0; i < queries.length; i++) {
      await this.query(queries[i]);
    }
  }

  private safeUsersIntoCSV(users: string[]) {
    fs.writeFileSync(this.path, users.join('\n'), { encoding: 'utf-8' });
  }

  private getUsersFromCSV() {
    const data = fs.readFileSync(this.path, { encoding: 'utf-8' });
    return data.split('\n').map((el, id) => {
      const userData = el.split(',');
      return {
        name: userData[0],
        email: userData[1],
        password: userData[2],
        role: userData[3],
        phoneNumber: userData[4],
      };
    });
  }

  private generateUsers() {
    const users = [];
    for (let i = 0; i <= 999; i++) {
      const user =
        this.generateName() + ',' +
        this.generateName() + '@gmail.com' + ',' +
        this.generateName(8) + ',' +
        (Math.random() * 10 > 9 ? 'admin' : 'user') + ',' +
        this.generatePhoneNumber().join('');
      users.push(user);
    }
    return users;
  }

  private generatePhoneNumber() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  }

  private generateName(length?: number) {
    length = length ? length : Math.random() * 7 + 3;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userName = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      userName += characters.charAt(randomIndex);
    }

    return userName;
  }

  // async findByUsername(username: string): Promise<User | undefined> {
  //   return this.findOne({ where: { username } });
  // }

  // async createUser(username: string, email: string, password: string): Promise<User> {
  //   const newUser = this.create({ username, email, password });
  //   return this.save(newUser);
  // }

  // async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     return undefined;
  //   }

  //   Object.assign(user, userData);
  //   return this.save(user);
  // }

  // async deleteUser(id: number): Promise<void> {
  //   await this.delete(id);
  // }
}