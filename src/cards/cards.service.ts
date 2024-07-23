import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-cards.dto';
import { UpdateCardDto } from './dto/update-cards.dto';
import { Cards } from './entities/cards.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

/**
 * Service class for the card microservice.
 */
@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Cards)
    private cardRepository: Repository<Cards>,
  ) {}

  /**
   * Creates a new card for a user.
   * @param id - The id of the user for whom the card is to be created.
   * @param createCardDto - The date to create the card.
   * @returns A promise that resolves to the created card.
   */
  async create(id: number, createCardDto: CreateCardDto) {
    // Generate a salt for the cvv.
    const salt = await bcrypt.genSalt(10);

    // Obtain the card name and hash the cvv.
    createCardDto.cardName = createCardDto.cardName.trim();
    createCardDto.cvv = await bcrypt.hash(createCardDto.cvv, salt);
    createCardDto.userId = id;
    return await this.cardRepository.save(createCardDto);
  }

  /**
   * Retrieves all the cards for a user.
   * @param id - The id of the user whose cards are to be retrieved.
   * @returns 
   */
  async findAll(id: number) {
    return await this.cardRepository.find({where: {userId: id}});
  }

  /**
   * Retrieves a specific card for a user.
   * @param id - The id of the user who onws the card.
   * @param cardNumber - The card number of the card to retrieve.
   * @returns A promise that resolves to found the card with the specified card number.
   */
  async findOne(id: number, cardNumber: number) {
    // Check if the card with the specified card number exists.
    if (isNaN(cardNumber)) {
      throw new NotFoundException('Card not found');
    }
    return await this.cardRepository.findOne({ where: { userId: id, cardNumber: cardNumber } });
  }

  /**
   * 
   * @param id - The if of the user who owns the card.
   * @param updateCardDto - The data to update the card and the card number.
   * @returns A promise that resolves to the updated card. 
   */
  update(id: number, updateCardDto: UpdateCardDto) {
    const { cardNumber: cardNumber, ...data } = updateCardDto;
    return this.cardRepository.update(cardNumber, data);
  }

  /**
   * 
   * @param id - The id of the card to delete.
   * @returns A result of the card deletion.
   */
  delete(id: number) {
    return this.cardRepository.delete(id);
  }
}
