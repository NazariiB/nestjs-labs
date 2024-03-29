import { Message } from './entities/message.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/device/entities/device.entity';

@Injectable()
export class MessageRepository extends Repository<Message> {
  private path = 'E:/documents/nestjs-app/src/DBInitialData/message.csv';

  constructor(
    @InjectRepository(Message)
    repository: Repository<Message>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async initMessage() {
    const newMessages = this.generate();
    this.safeDevicesIntoCSV(newMessages);
    const message = this.getMessagesFromCSV();

    await this.save(message);
  }

  private safeDevicesIntoCSV(data: string[]) {
    fs.writeFileSync(this.path, data.join('\n'), {encoding:'utf-8'});
  }

  private getMessagesFromCSV() {
    const data = fs.readFileSync(this.path, {encoding: 'utf-8'});
    return data.split('\n').map(el => {
      const device = new Device();
      const message = new Message();

      const messageData = el.split(',');

      device.id = Number(messageData[3]);
      message.device = device;
      message.data = messageData[0];
      message.date = new Date(Number(messageData[1]));
      message.type = messageData[2];

      return message;
    });
  }

  private generate() {
    const messages = [];
    for(let i = 0; i <= 1000; i++) {
      const message = 
        this.generateText() + ',' +
        (new Date().getTime()) + ',' +
        (Math.random() > 0.9 ? 'alarm' : 'ok') + ',' +
        Math.floor(Math.random() * 999 + 1);
      messages.push(message);
    }
    return messages;
  }

  private generateText(length?: number) {
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