import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    findAll(options?: User): Promise<User[]> {
        return this.userRepository.find(options);
    }

    findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email });
    }

    findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ username });
    }

    count(field: string | number | boolean): Promise<number> {
        return this.userRepository
            .createQueryBuilder('user')
            .select(`SUM(user.${field})`, 'sum')
            .getCount();
    }

    save(account: User): Promise<any> {
        return this.userRepository.save(account);
    }

    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }
}
