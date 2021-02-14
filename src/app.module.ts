import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AdminModule,
        ClientModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
    ],
})
export class AppModule {}
