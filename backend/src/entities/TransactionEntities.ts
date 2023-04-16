import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity({ name: "WalletTransaction" })
export class TransactionEntities {
    @PrimaryColumn()
    id?: string;

    @Column()
    description?: string;

    @Column()
    receiverId?: number;

    @Column()
    senderId?: number;

    @Column()
    amount?: number;

    @Column()
    date?: string;
}