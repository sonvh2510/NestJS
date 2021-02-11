import { UserEntity } from '../../entities/user.entity';
import { createConnection } from 'typeorm';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',

        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host: 'eu-cdbr-west-03.cleardb.net',
                username: 'b5a3508b43ac7c',
                password: '8786fb87',
                database: 'heroku_97b9736828909fe',
                entities: [UserEntity],
            }),
    },
];
