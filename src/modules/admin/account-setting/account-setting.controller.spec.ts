import { Test, TestingModule } from '@nestjs/testing';
import { AccountSettingController } from './account-setting.controller';

describe('AccountSettingController', () => {
    let controller: AccountSettingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountSettingController],
        }).compile();

        controller = module.get<AccountSettingController>(
            AccountSettingController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
