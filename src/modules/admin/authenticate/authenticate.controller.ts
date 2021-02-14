import {
    Controller,
    Get,
    Post,
    Render,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    // UseFilters,
    // UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
// import { AdminAuthLocalGuard } from './admin-auth-local.guard';
// import { AdminAuthAccessFilter } from './admin-auth-access.filter';
// import { AdminAuthJwtFilter } from './admin-auth-jwt.guard';
import { RequestCustomize } from 'src/interfaces';
import { BaseRender } from 'src/helpers/base-render';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/auth')
export class AuthenticateController {
    constructor() {}

    @Get()
    root(@Res() res: Response) {
        return res.redirect('/admin/auth/signin');
    }

    @Get('signin')
    @Render('admin/auth/signin')
    get_signIn(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Sign in',
        });
    }

    // @UseGuards(AdminAuthLocalGuard)
    // @UseFilters(AdminAuthAccessFilter)
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async post_signIn(@Req() req: RequestCustomize, @Res() res: Response) {
        // const access_token = await this.authenticateService.generateToken(
        //     req.user,
        // );
        // const themes = {
        //     sidebar_class: req.user['sidebar_class'],
        //     header_class: req.user['header_class'],
        // };
        // const user = req.user;
        // delete user['sidebar_class'];
        // delete user['header_class'];
        // res.cookie('gp_auth', access_token, {
        //     expires: new Date(Date.now() + 1800000),
        // });
        // res.cookie('gp_theme', JSON.stringify(themes), {
        //     expires: new Date(Date.now() + 1800000),
        // });
        // res.cookie('gp_info', JSON.stringify(user), {
        //     expires: new Date(Date.now() + 1800000),
        // });
        return res.redirect('/admin/dashboard');
    }

    // @UseGuards(AdminAuthJwtFilter)
    // @UseFilters(AdminAuthAccessFilter)
    @Get('signout')
    post_signOut(@Req() req: RequestCustomize, @Res() res: Response) {
        res.clearCookie('gp_auth');
        res.clearCookie('gp_info');
        res.clearCookie('gp_theme');
        throw new UnauthorizedException();
    }
}
