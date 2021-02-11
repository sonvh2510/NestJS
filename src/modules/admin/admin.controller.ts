import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('admin/')
export class AdminController {
    @Get()
    root(@Res() res: Response) {
        return res.redirect('/admin/auth/signin');
    }
}
