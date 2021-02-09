import {
    Body,
    Controller,
    Get,
    Post,
    Redirect,
    Render,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateService } from 'src/modules/admin/authenticate/authenticate.service';

@Controller({
    path: 'auth',
})
export class AuthenticateController {
    constructor(private userService: AuthenticateService) {}

    @Get('signin')
    @Render('signin')
    signin() {
        return {
            page_title: 'Sign in',
        };
    }

    @Post('signin')
    @Render('signin')
    signinPostHandler(@Body() body) {
        console.log(body);
    }

    @Get('signup')
    @Render('signup')
    signup() {
        return {
            page_title: 'Sign up',
        };
    }

    @Post('signup')
    @Redirect('signin')
    async signupPostHandler(@Res() res: Response, @Body() body) {
        const { username, email, password } = body;
        console.log();
    }
}
