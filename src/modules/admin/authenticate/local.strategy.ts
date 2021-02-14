import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticateService: AuthenticateService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
            session: true,
            passReqToCallback: true,
        });
    }

    async validate(
        req: Request,
        username: string,
        password: string,
    ): Promise<any> {
        const user = await this.authenticateService.validateUser(
            username,
            password,
        );
        console.log(req);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
