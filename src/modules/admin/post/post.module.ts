import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PostController],
})
export class PostModule {}
