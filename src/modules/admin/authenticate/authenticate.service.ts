import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthenticateService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        return this.jwtService.signAsync(payload);
    }

    async validateAccount(email: string, inputPassword: string): Promise<any> {
        // find if user exists
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }

        // find if user password match
        const match = await bcrypt.compare(inputPassword, user.password);
        if (!match) {
            return null;
        }

        const { password, ...result } = user;
        return result;
    }
}
