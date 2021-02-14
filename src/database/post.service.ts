import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private userRepository: Repository<Post>,
    ) {}
}
