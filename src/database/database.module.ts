import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.provider';
import { PostProviders } from './post.provider';
import { UserProviders } from './user.provider';
import { PostService } from 'src/database/post.service';
import { UserService } from 'src/database/user.service';

@Module({
    providers: [
        ...DatabaseProviders,
        ...UserProviders,
        ...PostProviders,
        PostService,
        UserService,
    ],
    exports: [...UserProviders, ...PostProviders, PostService, UserService],
})
export class DatabaseModule {}
