import {
    Controller,
    Get,
    Post,
    Render,
    Req,
    Res,
    UnauthorizedException,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticateService } from './authenticate.service';
import { AdminAuthLocalGuard } from './admin-auth-local.guard';
import { AdminAuthAccessFilter } from './admin-auth-access.filter';
import { AdminAuthJwtFilter } from './admin-auth-jwt.guard';

@Controller('admin/auth')
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {}

    @Get()
    root(@Res() res: Response) {
        return res.redirect('/admin/auth/signin');
    }

    @Get('signin')
    @Render('admin/signin')
    get_signIn() {
        return {
            page: {
                title: 'Sign in',
            },
        };
    }

    @UseGuards(AdminAuthLocalGuard)
    @UseFilters(AdminAuthAccessFilter)
    @Post('signin')
    async post_signIn(@Req() req: Request, @Res() res: Response) {
        const access_token = await this.authenticateService.generateToken(
            req.user,
        );
        res.cookie(
            'authorization',
            JSON.stringify({ ...req.user, access_token }),
            {
                expires: new Date(Date.now() + 1800000),
            },
        );
        return res.redirect('/admin/dashboard');
    }

    @UseGuards(AdminAuthJwtFilter)
    @UseFilters(AdminAuthAccessFilter)
    @Get('signout')
    async post_signOut(@Req() req: Request, @Res() res: Response) {
        await res.clearCookie('authorization', { path: '/' });
        throw new UnauthorizedException();
    }
}
