import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Represents a card entity in the system.
 */
@Entity()
export class Cards {

    /**
     * The number and identifier of the card.
     * @example 1234567890123456
     */
    @Column({ primary: true, unique: true, nullable: false })
    public cardNumber: number;

    /**
     * The name of the card.
     * @example "Card for John Doe"
     */
    @Column({ unique: true, nullable: false })
    public cardName: string;

    /**
     * The expiration date of the card.
     * @example "12/24"
     */
    @Column({ nullable: false })
    public expirationDate: string;

    /**
     * The cvv of the card.
     * @example "123"
     */
    @Column({ nullable: false })
    public cvv: string;

    /**
     * The id of the user who owns the card.
     */
    @Column({ nullable: false })
    public userId: number;

    /**
     * The date and time the card was created.
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    /** 
     * The date and time the card was last updated.
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
                        
    /** 
     * The date and time the card was deleted.
     */
    @DeleteDateColumn()
    public deletedAt: Date;
}
