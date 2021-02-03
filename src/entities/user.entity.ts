import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({ length: 32, type: 'varchar' })
    first_name: string;

    @Column({ length: 32, type: 'varchar' })
    last_name: string;

    @Column({ length: 255, type: 'varchar' })
    email: string;

    @Column({ length: 12, type: 'varchar' })
    phone: string;

    @Column({ length: 70, type: 'char' })
    password: string;

    @Column({ type: 'date' })
    created_date: string;

    @Column({ type: 'tinyint', default: 1 })
    is_enabled: boolean;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted: boolean;
}
