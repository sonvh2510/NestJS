import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.enableCors({
        origin: '*',
    });
    app.useStaticAssets(join(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    app.setViewEngine('pug');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    await app.listen(3000);
}
bootstrap();
