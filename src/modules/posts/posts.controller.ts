import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { PostEntity as PostEntity } from './entities/post.entity';
import { PostDto } from './dto/post.dto';

@ApiTags('Posts')
@Controller('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() postDto: PostDto): Promise<PostEntity> {
    return this.postsService.create(postDto);
  }
}
