import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/configs/database/database.module';
import { UserProviders } from 'src/providers/user.provider';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    exports: [...UserProviders, UserService],
    providers: [...UserProviders, UserService],
})
export class UserModule {}
