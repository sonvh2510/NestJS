import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticateService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    saveAccount(user: User): Promise<any> {
        return this.userRepository.save(user);
    }

    signinValidate(email: string): Promise<any> {
        return this.userRepository.findAndCount({ email });
    }
}
