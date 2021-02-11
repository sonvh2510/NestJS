import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AdminAuthLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticateService: AuthenticateService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authenticateService.validateAccount(
            email,
            password,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
