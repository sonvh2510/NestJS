import { UserEntity } from '../entities/user.entity';
import { createConnection } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                database: process.env.DATABASE_NAME,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                entities: [UserEntity, PostEntity],
            }),
    },
];
