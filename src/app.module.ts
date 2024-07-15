import { Module } from '@nestjs/common';
import { CardModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CardModule
  ],
})
export class AppModule {}
