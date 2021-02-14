import {
    Controller,
    Get,
    Render,
    Req,
    // UseFilters,
    // UseGuards,
} from '@nestjs/common';
import { BaseRender } from 'src/helpers/base-render';
import { RequestCustomize } from 'src/interfaces';
// import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
// import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';

@Controller('admin/dashboard')
// @UseGuards(AdminAuthJwtFilter)
// @UseFilters(AdminAuthAccessFilter)
export class DashboardController {
    @Get()
    @Render('admin/dashboard/dashboard')
    root(@Req() req: RequestCustomize) {
        return BaseRender(req, {
            pageTitle: 'Dashboard',
        });
    }
}
