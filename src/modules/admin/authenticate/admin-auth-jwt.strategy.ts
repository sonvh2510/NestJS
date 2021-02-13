import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './contansts';

export const cookieExtractor = (req) => {
    const { gp_auth } = req.cookies;
    return gp_auth ? gp_auth : null;
};

@Injectable()
export class AdminAuthJwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(user: any) {
        if (!user) {
            throw new UnauthorizedException();
        }
        return { id: user.id, email: user.email };
    }
}
