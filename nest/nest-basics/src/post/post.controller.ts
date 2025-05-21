import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostInterface } from './interfaces/post-interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAlluser(@Query('search') search: string): PostInterface[] {
    const extractAllPost = this.postService.findAll();

    if (search) {
      return extractAllPost.filter((singlePost) => {
        singlePost.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    return extractAllPost;
  }
}
