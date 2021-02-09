import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/admin/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthenticateModule } from './modules/admin/authenticate/authenticate.module';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload',
            }),
        }),
        UserModule,
        AuthenticateModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
