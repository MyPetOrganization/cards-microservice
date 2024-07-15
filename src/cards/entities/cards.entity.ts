import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cards {

    @Column({ primary: true, unique: true, nullable: false })
    public cardNumber: number;

    @Column({ unique: true, nullable: false })
    public cardName: string;

    @Column({ nullable: false })
    public expirationDate: string;

    @Column({ nullable: false })
    public cvv: string;

    @Column({ nullable: false })
    public userId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    public updatedAt: Date;
                        
    @DeleteDateColumn()
    public deletedAt: Date;
}
