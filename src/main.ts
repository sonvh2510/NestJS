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
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');
    await app.listen(3000);
}
bootstrap();
