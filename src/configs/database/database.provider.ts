import { UserEntity } from '../../entities/user.entity';
import { createConnection } from 'typeorm';

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'mysql',
                host:
                    'mysql://b5a3508b43ac7c:8786fb87@us-cdbr-east.cleardb.com/heroku_97b9736828909fe?reconnect=true',
                username: 'b5a3508b43ac7c',
                password: '8786fb87',
                database: 'goldprice',
                entities: [UserEntity],
            }),
    },
];
