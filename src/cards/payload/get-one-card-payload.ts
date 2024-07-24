/**
 * Payload for getting one card
 */
export interface GetOneCardPayload {
    // The id of the user who owns the card.
    id: number;
    // The card number of the card to retrieve.
    cardNumber: string;
}