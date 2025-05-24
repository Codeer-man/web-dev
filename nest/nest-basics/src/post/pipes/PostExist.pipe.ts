import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PostService } from '../post.service';

@Injectable()
export class PostExistPipe implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.postService.findSinglePost(value);
    } catch (error) {
      throw new NotFoundException(`Post with id ${value} does not exist!`);
    }
    return value;
  }
}
