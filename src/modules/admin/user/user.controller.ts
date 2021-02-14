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
import { Response } from 'express';
import { SIDEBAR } from 'src/configs/sidebar';
import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';
import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
import bcrypt = require('bcrypt');
import { RequestCustomize } from 'src/interfaces';
import { BaseRender } from 'src/helpers/base-render';
import { UserService } from 'src/database/user.service';

@Controller('admin/user')
@UseGuards(AdminAuthJwtFilter)
@UseFilters(AdminAuthAccessFilter)
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    @Redirect('/admin/user/list')
    root() {
        return {};
    }

    @Get('list')
    @Render('admin/user/user')
    async listUser(@Req() req: RequestCustomize) {
        const users = await this.userService.findAll();
        return BaseRender(
            req,
            {
                pageTitle: 'Users',
            },
            {
                users,
            },
        );
    }

    @Get('create')
    @Render('admin/user/user-create')
    get_createUser(@Req() req: RequestCustomize) {
        return BaseRender(
            req,
            {
                pageTitle: 'Create new account',
            },
            {
                email: req.flash('email')[0],
                username: req.flash('username')[0],
                role: req.flash('role')[0],
                password: req.flash('password')[0],
            },
        );
    }

    @Post('create')
    async post_createUser(
        @Req() req: RequestCustomize,
        @Res() res: Response,
        @Body() body,
    ) {
        const { username, email, password, role } = body;
        req.flash('username', username);
        req.flash('email', email);
        req.flash('password', password);
        req.flash('role', role);
        const user_email = await this.userService.findByEmail(email);
        const user_username = await this.userService.findByUsername(username);
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
                await this.userService.save({
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
    @Render('admin/user/user-edit')
    async get_editAccount(@Req() req: RequestCustomize, @Param() params) {
        const accountID = params.accountID;
        try {
            const user = await this.userService.findById(accountID);
            if (user) {
                return BaseRender(
                    req,
                    {
                        pageTitle: 'Edit account',
                    },
                    {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    },
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    @Post('edit/:accountID')
    async post_editAccount(
        @Body() body,
        @Res() res: Response,
        @Param() params,
    ) {
        const { accountID } = params;
        await this.userService.update(accountID, body);
        return res.redirect(`/admin/user/edit/${accountID}`);
    }

    @Get('delete/:accountID')
    async post_deleteUser(@Res() res: Response, @Param() params) {
        const { accountID } = params;
        await this.userService.delete(accountID);
        return res.redirect('/admin/user');
    }
}
