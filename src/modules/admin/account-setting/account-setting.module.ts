import { Module } from '@nestjs/common';
import { AccountSettingController } from './account-setting.controller';
import { AccountSettingService } from './account-setting.service';

@Module({
    controllers: [AccountSettingController],
    providers: [AccountSettingService],
})
export class AccountSettingModule {}
