import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { jwtConstants } from './contansts';
import { AdminAuthJwtStrategy } from './admin-auth-jwt.strategy';
import { AdminAuthLocalStrategy } from './admin-auth-local.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [
        AuthenticateService,
        AdminAuthLocalStrategy,
        AdminAuthJwtStrategy,
    ],
    controllers: [AuthenticateController],
    exports: [AuthenticateService, PassportModule],
})
export class AuthenticateModule {}
