import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
import flash = require('connect-flash');
import session = require('express-session');
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.use(compression());
    app.enableCors({
        origin: '*',
    });
    app.use(cookieParser());
    app.use(
        session({
            secret: 'secret_of_wibu',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false },
        }),
    );
    app.use(flash());
    app.useStaticAssets(join(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    app.setViewEngine('pug');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    await app.listen(PORT);
}
bootstrap();
