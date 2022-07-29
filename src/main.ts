import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TodoModule } from './todo/todo.module'

var port = 3001

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  app.enableCors();
  await app.listen(port);
  console.log(`Backend is listening on PORT: ${port}`)
}
bootstrap();
