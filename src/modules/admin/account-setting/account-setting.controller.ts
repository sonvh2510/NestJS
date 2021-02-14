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
import { RequestCustomize } from 'src/interfaces';
import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';

@Controller('admin/account-setting')
@UseGuards(AdminAuthJwtFilter)
@UseFilters(AdminAuthAccessFilter)
export class AccountSettingController {
    constructor() {}

    @Get()
    @Redirect('/admin/account-setting/overview')
    root(@Req() req: RequestCustomize) {}

    @Get('/overview')
    @Render('admin/account-setting/overview')
    overview(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Overview',
        });
    }

    @Get('/appearance')
    @Render('admin/account-setting/appearance')
    appearance(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Appearance',
        });
    }

    @Get('/security')
    @Render('admin/account-setting/security')
    security(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Security',
        });
    }
}
