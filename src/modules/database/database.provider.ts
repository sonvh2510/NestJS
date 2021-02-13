import { UserEntity } from '../../entities/user.entity';
import { createConnection } from 'typeorm';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',

        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: 'us-cdbr-east-03.cleardb.com',
                username: 'b27b3f3a7e14de',
                password: '99bc181b',
                database: 'heroku_1b5e874b3b9063e',
                entities: [UserEntity],
            }),
    },
];
