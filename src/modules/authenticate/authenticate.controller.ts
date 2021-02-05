import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import bcrypt = require('bcrypt');
import { UserService } from 'src/services/user.service';
let hashedPassword: string;
@Controller('authenticate')
export class AuthenticateController {
    constructor(private userService: UserService) {}

    @Get('signin')
    @Render('signin')
    signin() {
        return {
            page_title: 'Sign in',
        };
    }
    @Post('signin')
    async signIn_Post(@Res() res: Response, @Body() body) {
        const { password } = body;
        const result = await bcrypt.compare(password, hashedPassword);
        console.log(result);

        return res.send({
            data: {
                body,
                result,
            },
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
    @Post('signup')
    async signUp_Post(@Res() res: Response, @Body() body) {
        const { username, password, email } = body;
        hashedPassword = await bcrypt.hash(password, 12);
        this.userService.save({
            user_name: username,
            password: hashedPassword,
            first_name: username,
            last_name: username,
            email: email,
            phone: '09876523421',
            created_date: new Date(),
            role: 2,
        });
        return res.send({
            data: {
                username,
                email,
                password: hashedPassword,
            },
            status: res.status,
        });
    }
}
