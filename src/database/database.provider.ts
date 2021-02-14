import { UserEntity } from '../entities/user.entity';
import { createConnection } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { CONFIGS } from 'src/configs/configs';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: CONFIGS.DATABASE.host,
                database: CONFIGS.DATABASE.database,
                username: CONFIGS.DATABASE.username,
                password: CONFIGS.DATABASE.password,
                entities: [UserEntity, PostEntity],
            }),
    },
];
