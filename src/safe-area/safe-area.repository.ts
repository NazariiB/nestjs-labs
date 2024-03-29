import { SafeArea } from './entities/safe-area.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SafeAreaRepository extends Repository<SafeArea> {
  private path = 'E:/documents/nestjs-app/src/DBInitialData/safe-area.csv';

  constructor(
    @InjectRepository(SafeArea)
    repository: Repository<SafeArea>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async initSafeArea() {
    const newSafeAreas = this.generateSafeArea();
    this.safeAreasIntoCSV(newSafeAreas);
    const areas = this.getAreasFromCSV();

    await this.save(areas);
  }

  private safeAreasIntoCSV(users: string[]) {
    fs.writeFileSync(this.path, users.join('\n'), {encoding:'utf-8'});
  }

  private getAreasFromCSV() {
    const data = fs.readFileSync(this.path, {encoding: 'utf-8'});
    return data.split('\n').map(el => {
      const area = new SafeArea();
      const user = new User();

      const userData = el.split(',');
      user.id = Number(userData[0]);
      area.userId = user;
      area.name = userData[1];
      area.is_working = userData[2] === 'true';

      return area;
    });
  }

  private generateSafeArea() {
    const areas = [];
    for(let i = 0; i <= 999; i++) {
      const area = 
        Math.floor(Math.random() * 999 + 1) + ',' +
        this.generateName(6) + ',' +
        !!(Math.random() > 0.5);
      areas.push(area);
    }
    return areas;
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
}
