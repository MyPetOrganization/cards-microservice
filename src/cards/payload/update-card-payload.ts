import { UpdateCardDto } from "../dto/update-cards.dto";

export interface UpdateCardPayload {
    id: number;
    updateCardDto: UpdateCardDto;
}