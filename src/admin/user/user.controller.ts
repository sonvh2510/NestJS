import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    @Get('list')
    root(@Req() req: Request, @Res() res: Response) {
        return res.status(200).json({
            code: 200,
            data: {
                users: [{ username: 'sonvh2510', password: 'self125094' }],
            },
            message: '',
        });
    }

    @Put('add')
    @UseInterceptors(FilesInterceptor('files'))
    addUser(@Body() body, @Res() res: Response) {
        console.log(body);

        return res.status(200).json({
            data: body,
            error: res.statusMessage,
            statusCode: res.statusCode,
        });
    }
}
