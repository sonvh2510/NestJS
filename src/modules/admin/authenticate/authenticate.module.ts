import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { jwtConstants } from './contansts';
import { AdminAuthJwtStrategy } from './admin-auth-jwt.strategy';
import { AdminAuthLocalStrategy } from './admin-auth-local.strategy';
import { SignInMiddleware } from '../../../middlewares/signin.middleware';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        DatabaseModule,
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
export class AuthenticateModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInMiddleware).forRoutes({
            path: '/admin/auth/signin',
            method: RequestMethod.GET,
        });
    }
}
