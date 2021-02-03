import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserProviders } from './user.provider';
import { DatabaseModule } from 'src/configs/database/database.module';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...UserProviders, UserService],
})
export class UserModule {}
