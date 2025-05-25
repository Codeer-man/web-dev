import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post-interface';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entities';
import { createPostDto } from './dto/create-post-dto';
import { updatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) //entities
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findSinglePost(id: number): Promise<Post> {
    const singlePost = await this.postRepository.findOneBy({ id });

    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return singlePost;
  }

  async create(createPostData: createPostDto): Promise<Post> {
    const newPost = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.author,
    });

    return this.postRepository.save(newPost);
  }

  async update(id: number, updateData: updatePostDto): Promise<Post> {
    const findPostToUpdate = await this.findSinglePost(id);

    if (!findPostToUpdate) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (updateData.title) {
      findPostToUpdate.title = updateData.title;
    }
    if (updateData.content) {
      findPostToUpdate.content = updateData.content;
    }
    if (updateData.author) {
      findPostToUpdate.authorName = updateData.author;
    }

    return this.postRepository.save(findPostToUpdate);
  }

  async delete(id: number): Promise<void> {
    const findPostToDelete = await this.findSinglePost(id);

    await this.postRepository.remove(findPostToDelete);
  }
}
