import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/database/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthenticateService } from './authenticate.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({
            session: true,
        }),
        JwtModule.register({
            secret: process.env.AUTH_SECRET_KEY,
            signOptions: { expiresIn: '1800s' },
        }),
    ],
    providers: [UserService, AuthenticateService, LocalStrategy],
    controllers: [AuthenticateController],
})
export class AuthenticateModule {}
