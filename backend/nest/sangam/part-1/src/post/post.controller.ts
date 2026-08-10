import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import type { PostInterface } from './interface/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entities';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipe/post.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostBody: CreatePostDto): Promise<PostEntity> {
    return await this.postService.create(createPostBody);
  }

  @Put('/update')
  async update(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.update(id, updatePostData);
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postService.remove(id);
  }
}
