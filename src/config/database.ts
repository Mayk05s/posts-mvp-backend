import { PostEntity } from '../modules/posts/entities/post.entity';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'sqlite' as any,
  database: ':memory:',
  dropSchema: true,
  entities: [PostEntity],
  synchronize: true,
}));
