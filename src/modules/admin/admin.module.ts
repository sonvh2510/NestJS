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
import { BlogModule } from './post/post.module';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { AccountSettingModule } from './account-setting/account-setting.module';

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
        BlogModule,
        AccountSettingModule,
    ],
    providers: [],
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
