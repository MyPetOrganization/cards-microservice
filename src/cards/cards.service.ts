import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-cards.dto';
import { UpdateCardDto } from './dto/update-cards.dto';
import { Cards } from './entities/cards.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Cards)
    private cardRepository: Repository<Cards>,
  ) {}

  async create(id: number, createCardDto: CreateCardDto) {
    const salt = await bcrypt.genSalt(10);
    createCardDto.cardName = createCardDto.cardName.trim();
    createCardDto.cvv = await bcrypt.hash(createCardDto.cvv, salt);
    createCardDto.userId = id;
    return await this.cardRepository.save(createCardDto);
  }

  async findAll(id: number) {
    return await this.cardRepository.find({where: {userId: id}});
  }

  async findOne(id: number, cardNumber: number) {
    if (isNaN(cardNumber)) {
      throw new NotFoundException('Card not found');
    }
    return await this.cardRepository.findOne({ where: { userId: id, cardNumber: cardNumber } });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    const { cardNumber: cardNumber, ...data } = updateCardDto;
    return this.cardRepository.update(cardNumber, data);
  }

  delete(id: number) {
    return this.cardRepository.delete(id);
  }
}
