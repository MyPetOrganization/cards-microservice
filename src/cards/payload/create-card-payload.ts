import { CreateCardDto } from "../dto/create-cards.dto";

/**
 * Payload for creating a card.
 */
export interface CreateCardPayload {
    // The data to create the card.
    createCardDto: CreateCardDto;
}