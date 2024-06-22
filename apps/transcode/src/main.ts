import { NestFactory } from '@nestjs/core';
import { TranscodeModule } from './transcode.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  TRANSCODE_SERVER_CLIENT_ID,
  TRANSCODE_SERVER_GROUP_ID,
} from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(TranscodeModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: TRANSCODE_SERVER_CLIENT_ID,
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: TRANSCODE_SERVER_GROUP_ID,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
