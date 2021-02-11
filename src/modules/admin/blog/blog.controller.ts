import { Controller, Get, Redirect, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { SIDEBAR } from 'src/configs/sidebar/sidebar';

@Controller('admin/blog')
export class BlogController {
    @Get()
    @Redirect('/admin/blog/list')
    root() {
        return {};
    }

    @Get('list')
    @Render('admin/blog')
    async listUser(@Req() req: Request) {
        return {
            page: {
                title: 'Users',
                sidebar: SIDEBAR,
                url: req.route.path,
            },
            data: {},
        };
    }

    @Get('create')
    @Render('admin/blog-create')
    get_createUser(@Req() req: Request) {
        return {
            page: {
                title: 'Create new account',
                sidebar: SIDEBAR,
                url: req.route.path,
            },
            data: {},
        };
    }
}
