import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserProviders } from '../../../providers/user.provider';
import { DatabaseModule } from 'src/configs/database/database.module';
import { UserService } from 'src/modules/admin/user/user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...UserProviders, UserService],
})
export class UserModule {}
