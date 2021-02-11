import { UserEntity } from '../../entities/user.entity';
import { createConnection } from 'typeorm';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: 'us-cdbr-hirone-west- 06.cleardb.net',
                username: 'b5a3508b43ac7c',
                password: '8786fb87',
                database: 'goldprice',
                entities: [UserEntity],
            }),
    },
];
