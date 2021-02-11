import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AdminController } from './admin.controller';
import { BlogModule } from './blog/blog.module';

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
    ],
    providers: [],
    controllers: [AdminController],
})
export class AdminModule {}
