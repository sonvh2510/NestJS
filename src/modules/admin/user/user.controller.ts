import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Render,
    Req,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { SIDEBAR } from 'src/configs/sidebar/sidebar';
import { UserService } from 'src/modules/admin/user/user.service';
const bcrypt = require('bcrypt');

@Controller('admin/user')
export class UserController {
    constructor(private user: UserService) {}

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
        console.log(req.route.path);

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
        const user_email = await this.user.findBy({ email });
        const user_username = await this.user.findBy({ username });
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
            const user = await this.user.findBy({
                id: accountID,
            });
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
        const accountID = params.accountID;
        try {
            const user = await this.user.findBy({
                id: accountID,
            });
            if (user) {
                await this.user.delete(parseInt(accountID));
            }
            return res.redirect('/admin/user');
        } catch (error) {
            console.error(error);
        }
    }

    // @Post('upload')
    // @UseInterceptors(
    //     FilesInterceptor('files[]', 20, {
    //         storage: diskStorage({
    //             destination: './upload',
    //             filename: (req, file, callback) => {
    //                 callback(null, file.originalname);
    //             },
    //         }),
    //     }),
    // )
    // addUser(@Body() body, @Res() res: Response, @UploadedFiles() files) {
    //     if (files) {
    //         files.forEach((file) => {
    //             console.log(file);
    //         });
    //     }
    //     console.log(files);
    //     console.log(body);

    //     return res.status(200).json({
    //         data: {
    //             files,
    //             body,
    //         },
    //         error: res.statusMessage,
    //         statusCode: res.statusCode,
    //     });
    // }
}
