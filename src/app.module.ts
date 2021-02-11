import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
    imports: [AdminModule, ClientModule],
})
export class AppModule {}
