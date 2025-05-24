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
import { Post as PostInterface } from './interfaces/post-interface';
import { createPostDto } from './dto/create-post-dto';
import { updatePostDto } from './dto/update-post-dto';
import { PostExistPipe } from './pipes/PostExist.pipe';

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
  findSinglePost(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
  ): PostInterface {
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
  create(@Body() createPostData: createPostDto): PostInterface {
    return this.postService.create(createPostData);
  }

  // update Post
  @Put(':id/update')
  update(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
    @Body()
    updateData: updatePostDto,
  ): PostInterface {
    return this.postService.update(id, updateData);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
    return this.postService.delete(id);
  }
}
