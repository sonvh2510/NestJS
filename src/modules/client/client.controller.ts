import { Controller, Get, Render } from '@nestjs/common';

@Controller('client')
export class ClientController {
    @Get()
    @Render('client/index')
    index() {
        return {
            message: 'Hello World',
        };
    }
}
