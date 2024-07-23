import { UpdateCardDto } from "../dto/update-cards.dto";

/**
 * Payload for updating a card.
 */
export interface UpdateCardPayload {
    // The id of the user who owns the card.
    id: number;
    // The card data to update and the card number.
    updateCardDto: UpdateCardDto;
}