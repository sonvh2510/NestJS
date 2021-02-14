import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestCustomize } from 'src/interfaces';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: RequestCustomize, res: Response, next: NextFunction) {
        const { gp_info, gp_theme } = req.cookies;
        if (!req.route.path.includes('/admin/auth') && gp_info) {
            req.userLogged = JSON.parse(gp_info);
        }
        if (gp_theme) {
            req.theme = JSON.parse(gp_theme);
        }
        return next();
    }
}
