import { Test, TestingModule } from '@nestjs/testing';
import { AccountSettingService } from './AccountSetting.service';

describe('AccountSettingService', () => {
  let service: AccountSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountSettingService],
    }).compile();

    service = module.get<AccountSettingService>(AccountSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
