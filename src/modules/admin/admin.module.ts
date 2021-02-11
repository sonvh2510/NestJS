import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AdminController } from './admin.controller';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload',
            }),
        }),
        UserModule,
        DashboardModule,
        AuthenticateModule,
    ],
    providers: [],
    controllers: [AdminController],
})
export class AdminModule {}
