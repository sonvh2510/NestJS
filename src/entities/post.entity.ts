import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({ length: 255, type: 'varchar' })
    title: string;

    @Column({ length: 255, type: 'varchar', unique: true })
    url: string;

    @Column({ length: 255, type: 'varchar' })
    sub_title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int', nullable: false })
    author: number;

    @Column({ type: 'datetime', nullable: false })
    created_date: string;

    @Column({ type: 'datetime', nullable: false })
    last_edited: string;
}
