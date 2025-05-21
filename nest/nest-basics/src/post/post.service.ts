import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post-interface';

@Injectable()
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'manandhar',
      content: 'Hello world',
      author: 'manish',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }
}
