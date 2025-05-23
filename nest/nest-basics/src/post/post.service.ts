import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post-interface';
import { NotFoundError } from 'rxjs';

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

  findSinglePost(id: number): Post {
    const singlePost = this.posts.find((post) => post.id === id);

    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return singlePost;
  }

  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updateData: Partial<Omit<Post, 'id' | 'createdAt'>>) {
    const findPostIndex = this.posts.findIndex((post) => post.id === id);

    if (findPostIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.posts[findPostIndex] = {
      ...this.posts[findPostIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return this.posts[findPostIndex];
  }

  delete(id: number): { message: string } {
    const findIndexToDeletePost = this.posts.findIndex(
      (posts) => posts.id === id,
    );

    if (findIndexToDeletePost === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.posts.splice(findIndexToDeletePost, 1);

    return { message: `Post of id ${id} has been deleted` };
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }
}
