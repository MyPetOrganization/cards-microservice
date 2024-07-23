import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString, Matches, Max, Min } from "class-validator";

/**
 * The data to create a card.
 */
export class CreateCardDto {

    /**
     * The number of the card.
     * Verify that the card number is a number.
     * @example 123456789
     */
    @IsNumber()
    cardNumber: number;

    /**
     * The name of the card.
     * Avoid leading and trailing white spaces.
     * Verify that the card name is a string.
     * Verify that the card name only contains letters and numbers.
     * @example "Card for John Doe"
     */
    @Transform(({ value }) => value.trim())
    @Matches(/^[a-zA-Z0-9]+$/)
    @IsString()
    cardName: string;

    /**
     * The expiration date of the card.
     * Verify that the expiration date is a date.
     * @example "2023-12-31"
     */
    @IsDate()
    expirationDate: string;

    /**
     * The cvv of the card.
     * Verify that the cvv is a string.
     * Verify that the cvv is between 3 and 4 characters long.
     * @example "123"
     */
    @IsString()
    @Min(3)
    @Max(4)
    cvv: string;

    /**
     * The id of the user who owns the card.
     */
    @IsNumber()
    userId: number;
}
