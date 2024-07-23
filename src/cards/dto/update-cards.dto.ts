import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-cards.dto';
import { IsNumber } from 'class-validator';

/**
 * Data transfer object for updating an existing card.
 */
export class UpdateCardDto extends PartialType(CreateCardDto) {
    
    /**
     * The number of the card.
     * Verify that the card number is a number.
     * @example 123456789
     */
    @IsNumber()
    cardNumber: number;
}
