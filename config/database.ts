import { User } from 'src/user/user.entity';
import { createConnection } from 'typeorm';
import { Module } from '@nestjs/common';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [User],
        synchronize: true,
      });
    },
  },
];

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
