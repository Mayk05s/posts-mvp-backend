import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import defaultPosts from './default-posts.json';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<PostEntity> {
    const userId = 1;
    return this.postsRepository.findOne({ id, userId });
  }

  async create(postDto: PostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = postDto.title;
    post.body = postDto.body;
    post.userId = 1; // tmp we must set it form auth0

    return this.postsRepository.save(post);
  }

  public async fixtures() {
    const promisePosts = [];
    defaultPosts.forEach((post) => {
      promisePosts.push(this.postsRepository.save(post));
    });
    return Promise.all(promisePosts);
  }
}
