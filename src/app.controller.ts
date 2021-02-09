import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    root(@Req() req: Request) {
        console.log(req.route);
    }
}
