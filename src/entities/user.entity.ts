import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_admin')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({ length: 128, type: 'varchar', unique: true })
    username: string;

    @Column({ length: 255, type: 'varchar', unique: true })
    email: string;

    @Column({ length: 60, type: 'char' })
    password: string;

    @Column({ type: 'date' })
    created_date: string;

    @Column({ type: 'tinyint' })
    role: number;

    @Column({ type: 'tinyint', default: 1 })
    is_enabled: boolean;
}
