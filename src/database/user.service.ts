import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/interfaces';
import { Repository } from 'typeorm';

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

    save(account: any): Promise<any> {
        return this.userRepository.save(account);
    }

    update(id: number, options: User) {
        return this.userRepository.update(id, options);
    }

    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }
}
