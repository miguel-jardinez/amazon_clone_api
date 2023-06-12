import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || '3000';

  const config = new DocumentBuilder()
    .setTitle('Amazon Clone Api')
    .setDescription('Amazon clone API for all kind of frontend applications')
    .setVersion('1.0')
    .addTag('Amazon Clone')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap().then().catch();
