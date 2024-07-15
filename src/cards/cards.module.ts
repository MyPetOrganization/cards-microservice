import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './entities/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
