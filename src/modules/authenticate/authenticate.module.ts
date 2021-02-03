import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';

@Module({
    controllers: [AuthenticateController],
})
export class AuthenticateModule {}
