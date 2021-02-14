import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/database/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        // Find user if exist
        const user = await this.userService.findByUsername(username);
        if (!user) {
            return null;
        }
        // Check the password if match with hash password in db
        const match = await bcrypt.compare(pass, user.password);
        if (!match) {
            return null;
        }

        const { password, ...result } = user;
        return result;
    }
}
