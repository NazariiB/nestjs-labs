import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessageRepository,
  ) { }

  create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepo.create(createMessageDto);
    return this.messageRepo.save(message);
  }

  findAll() {
    return this.messageRepo.find();
  }

  findOne(id: number) {
    return this.messageRepo.findBy({ id });
  }
}
