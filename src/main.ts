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
import redis = require('redis');
import connectRedis = require('connect-redis');

const PORT = process.env.PORT || 3000;

const RedisStore = connectRedis(session);
//Configure redis client
const redisClient = redis.createClient({
    host: 'redis',
    port: 6789,
});

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.enableCors({
        origin: '*',
    });
    // somewhere in your initialization file
    app.use(cookieParser());
    app.use(
        session({
            secret: 'secret_of_wibu',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false },
            store: new RedisStore({ client: redisClient }),
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
