import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/configs/database/database.module';
import { UserProviders } from '../../../providers/user.provider';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthenticateController],
    providers: [...UserProviders, AuthenticateService],
})
export class AuthenticateModule {}
