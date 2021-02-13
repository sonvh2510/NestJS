import { Module } from '@nestjs/common';
import { BlogController } from './post.controller';
import { BlogService } from './post.service';

@Module({
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
