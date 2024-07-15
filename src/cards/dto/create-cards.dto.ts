import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString, Matches, Max, Min, min, minLength } from "class-validator";

export class CreateCardDto {

    @IsNumber()
    cardNumber: number;

    @Transform(({ value }) => value.trim())
    @Matches(/^[a-zA-Z0-9]+$/)
    @IsString()
    cardName: string;

    @IsDate()
    expirationDate: string;

    @IsString()
    @Min(3)
    @Max(4)
    cvv: string;

    @IsNumber()
    userId: number;
}
