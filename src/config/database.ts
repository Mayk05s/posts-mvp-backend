import { PostEntity } from '../modules/posts/entities/post.entity';
import { registerAs } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

const mySQL = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mysql',
  username: process.env.MYSQL_CONNECTION_USER || 'user',
  password: process.env.MYSQL_CONNECTION_PASSWORD || 'secret',
  database: process.env.MYSQL_CONNECTION_DATABASE || 'posts_mvp',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
};
const sqlite = {
  type: 'sqlite' as any,
  database: ':memory:',
  dropSchema: true,
};

function getDatabase() {
  const type = process.env.DATABASE_TYPE || 'sqlite';
  switch (type) {
    case 'sqlite':
      return sqlite;
    case 'mysql':
      return mySQL;
    default:
      throw new InternalServerErrorException(
        `DATABASE_TYPE: ${type} unknown! Please use sqlite or mysql`,
      );
  }
}

export default registerAs('database', () => {
  return {
    ...getDatabase(),
    entities: [PostEntity],
    synchronize: true,
  };
});
