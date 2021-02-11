import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SignInMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.cookies;
        const access_token = authorization
            ? JSON.parse(authorization)['access_token']
            : null;
        if (access_token) {
            return res.redirect('/admin/dashboard');
        } else {
            return next();
        }
    }
}
