import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepo.find();
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postRepo.findOneBy({ id: id });

    if (!singlePost) {
      throw new NotFoundException(`Post with id ${id} does not exists`);
    }

    return singlePost;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    const newlyCreatedPost = this.postRepo.create({
      title: createPostData.title,
      authorName: createPostData.authorName,
      content: createPostData.content,
    });

    return await this.postRepo.save(newlyCreatedPost);
  }

  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const findUpdatePost = await this.findOne(id);

    findUpdatePost.title = updatePostData.title;
    findUpdatePost.content = updatePostData.content;
    findUpdatePost.authorName = updatePostData.authorName;

    return await this.postRepo.save(findUpdatePost);
  }

  async remove(id: number): Promise<Post> {
    const findDeletePost = await this.findOne(id);

    return await this.postRepo.remove(findDeletePost);
  }
}
