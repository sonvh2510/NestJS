import { User } from '../../entities/user.entity';
import { createConnection } from 'typeorm';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'self125094',
                database: 'goldprice',
                entities: [User],
            }),
    },
];
