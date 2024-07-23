import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CardService } from './cards.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetOneCardPayload } from './payload/get-one-card-payload';
import { CreateCardPayload } from './payload/create-card-payload';
import { UpdateCardPayload } from './payload/update-card-payload';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  /**
   * Creates a new card.
   * @param payload - The payload containing the user id and the card to create.
   * @returns The result of the card creation.
   */

  @MessagePattern({ cmd: 'create-card' })
  async create(
    @Payload() payload: CreateCardPayload,
  ) {
    // Extract the user id from the payload.
    const id = payload.createCardDto.userId;
    // Calls the service to create the card.
    return await this.cardService.create(id,payload.createCardDto);
  }

  /**
   * Retrieves all the cards of a user.
   * @param userId - The id of the user whose cards are to be retrieved.
   * @returns The list of the user's cards.
   */
  @MessagePattern({ cmd: 'get_all_cards' })
  async findAll(@Payload('id', ParseIntPipe) userId: number) {
    return this.cardService.findAll(userId);
  }

  /**
   * Retrieves a specific card for a user.
   * @param payload - The payload containing the user id and card number. 
   * @returns The data of the card with the specified card number.
   */
  @MessagePattern({ cmd: 'get_one_card' })
  findOne(
    @Payload() payload: GetOneCardPayload,
  ) {
    const id = payload.id;
    const cardNumber = payload.cardNumber;
    return this.cardService.findOne(id, cardNumber);
  }

  /**
   * Updates an existing card.
   * @param payload - The payload containing the card id and the data to update.
   * @returns The result of the card update.
   */
  @MessagePattern({ cmd: 'update_card' })
  update(
    @Payload() payload: UpdateCardPayload
  ) {
    const id = payload.id;
    const updateCardDto = payload.updateCardDto;
    return this.cardService.update(id, updateCardDto);
  }

  /**
   * Deletes a card.
   * @param payload - The payload containing the card number to delete.
   * @returns The result of the card deletion.
   */
  @MessagePattern({ cmd: 'delete_card' })
  delete(
    @Payload() payload: GetOneCardPayload,
  ) {
    const cardNumber = payload.cardNumber;
    return this.cardService.delete(cardNumber);
  }
}
