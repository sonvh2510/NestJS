import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    created_date?: string;
    role?: number;
    is_enabled?: boolean;
}
@Entity('account_admin')
export class UserEntity {
    user: User;
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
