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
import { Post as PostInterface } from './interfaces/post-interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractData = this.postService.findAll();

    if (search) {
      return extractData.filter((userdetail) =>
        userdetail.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractData;
  }

  @Get(':id')
  findSinglePost(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postService.findSinglePost(id);
  }

  // create post
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPostData: Omit<PostInterface, 'id' | 'createdAt'>,
  ): PostInterface {
    return this.postService.create(createPostData);
  }

  // update Post
  @Put(':id/update')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
  ): PostInterface {
    return this.postService.update(id, updateData);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
