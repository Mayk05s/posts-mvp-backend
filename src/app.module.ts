import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    PostsModule
  ],
})
export class AppModule {}
