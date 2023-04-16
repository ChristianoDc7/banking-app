import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "user" })
export class UserEntities {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	username!: string;

	@Column()
	password!: string;

	@Column({ default: 0 })
	amount!: number;

	@Column()
	role!: number;
}