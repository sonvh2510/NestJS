import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    findBy(field: any): Promise<User> {
        return this.userRepository.findOne(field);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    count(field: string): Promise<any> {
        return this.userRepository
            .createQueryBuilder('user')
            .select(`SUM(user.${field})`, 'sum')
            .getCount();
    }

    save(adminAccount): Promise<any> {
        return this.userRepository.save(adminAccount);
    }
    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }
}
