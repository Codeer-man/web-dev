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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
// import { Post as PostInterface } from './interfaces/post-interface';
import { createPostDto } from './dto/create-post-dto';
import { updatePostDto } from './dto/update-post-dto';
import { PostExistPipe } from './pipes/PostExist.pipe';
import { Post as PostEntities } from './entities/post.entities';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntities[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findSinglePost(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
  ): Promise<PostEntities> {
    return this.postService.findSinglePost(id);
  }

  // create post
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  // individual validation pipes
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist:true ,
  //     forbidNonWhitelisted:true,
  //   })
  // )
  async create(@Body() createPostData: createPostDto): Promise<PostEntities> {
    return await this.postService.create(createPostData);
  }

  // update Post
  @Put(':id/update')
  async update(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
    @Body()
    updateData: updatePostDto,
  ): Promise<PostEntities> {
    return this.postService.update(id, updateData);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<void> {
    return this.postService.delete(id);
  }
}
