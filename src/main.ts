import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PostsService } from './modules/posts/posts.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder().setTitle('Posts example').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const postsService = app.get(PostsService);
  await postsService.fixtures();
  await app.listen(port);
}

bootstrap();
