import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CardService } from './cards.service';
import { UpdateCardDto } from './dto/update-cards.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetOneCardPayload } from './payload/get-one-card-payload';
import { CreateCardPayload } from './payload/create-card-payload';
import { UpdateCardPayload } from './payload/update-card-payload';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // @Post(':id')
  @MessagePattern({ cmd: 'create-card' })
  async create(
    // @Body() createCardDto: CreateCardDto,
    // @Param('id', ParseIntPipe) id: number,
    @Payload() payload: CreateCardPayload,
  ) {
    console.log('payload', payload);
    const id = payload.createCardDto.userId;
    return await this.cardService.create(id,payload.createCardDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'get_all_cards' })
  async findAll(@Payload('id', ParseIntPipe) userId: number) {
    return this.cardService.findAll(userId);
  }

  // @Post('fo/:id')
  @MessagePattern({ cmd: 'get_one_card' })
  findOne(
    // @Param('id', ParseIntPipe) id: number,
    // @Body('cardNumber', ParseIntPipe) cardNumber: number,
    @Payload() payload: GetOneCardPayload,
  ) {
    const id = payload.id;
    const cardNumber = payload.cardNumber;
    return this.cardService.findOne(id, cardNumber);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_card' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateCardDto: UpdateCardDto
    @Payload() payload: UpdateCardPayload
  ) {
    const id = payload.id;
    const updateCardDto = payload.updateCardDto;
    return this.cardService.update(id, updateCardDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_card' })
  delete(
    // @Param('id', ParseIntPipe) id: number,
    // @Body('cardNumber', ParseIntPipe) cardNumber: number,
    @Payload() payload: GetOneCardPayload,
  ) {
    const cardNumber = payload.cardNumber;
    return this.cardService.delete(cardNumber);
  }
}
