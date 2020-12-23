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
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const postsService = app.get(PostsService);
  const port = configService.get('PORT');

  swaggerInit(app);
  await postsService.fixtures();

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(port);
}

bootstrap();
