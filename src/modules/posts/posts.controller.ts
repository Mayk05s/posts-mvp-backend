import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { PostEntity as PostEntity } from './entities/post.entity';
import { PostDto } from './dto/post.dto';

@ApiTags('Posts')
@Controller('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post Id: '${id}' not found`);
    }
    return post;
  }

  @Post()
  async create(@Body() postDto: PostDto): Promise<PostEntity> {
    return this.postsService.create(postDto);
  }
}
