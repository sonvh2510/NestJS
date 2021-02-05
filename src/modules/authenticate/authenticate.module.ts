import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/configs/database/database.module';
import { UserService } from 'src/services/user.service';
import { UserProviders } from '../user/user.provider';
import { AuthenticateController } from './authenticate.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthenticateController],
    providers: [...UserProviders, UserService],
})
export class AuthenticateModule {}
