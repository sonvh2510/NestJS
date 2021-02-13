import {
    Controller,
    Get,
    Redirect,
    Render,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { BaseRender } from 'src/helpers/base-render';
import { RequestCustomize } from 'src/interfaces/request-custom';
import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';

@Controller('admin/post')
@UseGuards(AdminAuthJwtFilter)
@UseFilters(AdminAuthAccessFilter)
export class BlogController {
    @Get()
    @Redirect('/admin/post/list')
    root() {}

    @Get('list')
    @Render('admin/post/post')
    listUser(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Users',
        });
    }

    @Get('create')
    @Render('admin/post/post-create')
    get_createUser(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Create new account',
        });
    }
}
