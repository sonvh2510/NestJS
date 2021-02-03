import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('authenticate')
export class AuthenticateController {
    @Get('signin')
    @Render('signin')
    signin() {
        return {
            page_title: 'Sign in',
        };
    }
    @Post('signin')
    signIn_Post(@Res() res: Response, @Body() body: BodyInit) {
        console.log(body);
        return res.send({
            data: body,
            status: res.status,
        });
    }

    @Get('signup')
    @Render('signup')
    signup() {
        return {
            page_title: 'Sign up',
        };
    }
}
