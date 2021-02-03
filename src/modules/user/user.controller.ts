import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { UserService } from 'src/services/user.service';
@Controller('user')
export class UserController {
    constructor(private user: UserService) {}

    @Get('list')
    async root(@Req() req: Request, @Res() res: Response) {
        const users = await this.user.findAll();
        return res.status(200).json({
            code: 200,
            data: {
                users,
            },
            message: '',
        });
    }

    @Post('add')
    @UseInterceptors(
        FilesInterceptor('files[]', 20, {
            storage: diskStorage({
                destination: './upload',
                filename: (req, file, callback) => {
                    callback(null, file.originalname);
                },
            }),
        }),
    )
    addUser(@Body() body, @Res() res: Response, @UploadedFiles() files) {
        if (files) {
            files.forEach((file) => {
                console.log(file);
            });
        }
        console.log(files);
        console.log(body);

        return res.status(200).json({
            data: {
                files,
                body,
            },
            error: res.statusMessage,
            statusCode: res.statusCode,
        });
    }
}
