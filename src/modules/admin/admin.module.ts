import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AdminController } from './admin.controller';
import { PostModule } from './post/post.module';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { AccountSettingModule } from './account-setting/account-setting.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload',
            }),
        }),
        AuthenticateModule,
        DashboardModule,
        UserModule,
        PostModule,
        AccountSettingModule,
    ],
    controllers: [AdminController],
})
export class AdminModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminMiddleware).forRoutes({
            path: '/admin/**',
            method: RequestMethod.GET,
        });
    }
}
