import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestCustomize } from 'src/interfaces';

@Injectable()
export class SignInMiddleware implements NestMiddleware {
    use(req: RequestCustomize, res: Response, next: NextFunction) {
        const { gp_auth } = req.cookies;
        const access_token = gp_auth ? gp_auth : null;
        if (access_token) {
            return res.redirect('/admin/dashboard');
        } else {
            return next();
        }
    }
}
