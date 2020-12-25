import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PostsService } from './modules/posts/posts.service';

function swaggerInit(app) {
  const options = new DocumentBuilder().setTitle('Posts example').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const database = configService.get('database');
  if (database.type === 'sqlite') {
    const postsService = app.get(PostsService);
    await postsService.fixtures();
  }

  swaggerInit(app);
  await app.listen(port);
}

bootstrap();
