import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Render,
    Req,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SIDEBAR } from 'src/configs/sidebar/sidebar';
import { UserService } from 'src/modules/admin/user/user.service';
import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';
import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
import bcrypt = require('bcrypt');

@Controller('admin/user')
@UseGuards(AdminAuthJwtFilter)
@UseFilters(AdminAuthAccessFilter)
export class UserController {
    constructor(private user: UserService) {}
    @Get()
    @Redirect('user/list')
    root() {
        return {};
    }

    @Get('list')
    @Render('admin/user')
    async listUser(@Req() req: Request) {
        const users = await this.user.findAll();
        return {
            page: {
                title: 'Users',
                sidebar: SIDEBAR,
                url: req.route.path,
            },
            data: {
                users,
            },
        };
    }

    @Get('create')
    @Render('admin/user-create')
    get_createUser(@Req() req: Request) {
        return {
            page: {
                title: 'Create new account',
                sidebar: SIDEBAR,
                url: req.route.path,
            },
            data: {
                email: req.flash('email')[0],
                username: req.flash('username')[0],
                role: req.flash('role')[0],
                password: req.flash('password')[0],
            },
            message: {
                user_emailError: req.flash('user_email'),
                user_usernameError: req.flash('user_username'),
                user_roleError: req.flash('user_role'),
                user_passwordError: req.flash('user_password'),
            },
        };
    }

    @Post('create')
    async post_createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body,
    ) {
        const { username, email, password, role } = body;
        req.flash('username', username);
        req.flash('email', email);
        req.flash('password', password);
        req.flash('role', role);
        const user_email = await this.user.findByEmail(email);
        const user_username = await this.user.findByUsername(username);
        const user_role = isNaN(role);

        if (email == '') {
            req.flash('user_email', 'Please enter email');
        }
        if (user_email) {
            req.flash('user_email', 'This email is existed');
        }
        if (username == '') {
            req.flash('user_username', 'Please enter username');
        }
        if (user_username) {
            req.flash('user_username', 'This username is existed');
        }
        if (user_role) {
            req.flash('user_role', 'Please choose role before create new');
        }
        if (password == '') {
            req.flash('user_password', 'Please enter password');
        }
        if (
            email == '' ||
            user_email ||
            user_username ||
            user_role ||
            password == ''
        ) {
            res.redirect('/admin/user/create');
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            try {
                await this.user.save({
                    email,
                    username,
                    password: hashedPassword,
                    role: parseInt(role),
                });
                res.redirect('/admin/user');
            } catch (error) {
                console.error(error);
            }
        }
    }

    @Get('edit/:accountID')
    @Render('admin/user-create')
    async get_editAccount(@Req() req: Request, @Param() params) {
        const accountID = params.accountID;
        try {
            const user = await this.user.findById(accountID);
            if (user) {
                return {
                    page: {
                        title: 'Edit account',
                        sidebar: SIDEBAR,
                        url: req.route.path,
                    },
                    data: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        role: user.role,
                    },
                };
            }
        } catch (error) {
            console.error(error);
        }
    }

    @Post('delete/:accountID')
    async post_deleteUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param() params,
    ) {
        const email = params.email;
        try {
            const user = await this.user.findByEmail(email);
            if (user) {
                await this.user.delete(user.id);
            }
            return res.redirect('/admin/user');
        } catch (error) {
            console.error(error);
        }
    }
}
