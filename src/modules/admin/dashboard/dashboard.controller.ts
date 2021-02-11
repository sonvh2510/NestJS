import {
    Controller,
    Get,
    Render,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SIDEBAR } from 'src/configs/sidebar/sidebar';
import { AdminAuthAccessFilter } from '../authenticate/admin-auth-access.filter';
import { AdminAuthJwtFilter } from '../authenticate/admin-auth-jwt.guard';

@Controller('admin/dashboard')
@UseGuards(AdminAuthJwtFilter)
@UseFilters(AdminAuthAccessFilter)
export class DashboardController {
    @Get()
    @Render('admin/dashboard')
    root(@Req() req: Request) {
        return {
            page: {
                title: 'Users',
                sidebar: SIDEBAR,
                url: req.route.path,
            },
        };
    }
}
