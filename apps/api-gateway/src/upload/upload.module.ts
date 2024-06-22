import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import {
  CloudModule,
  TRANSCODE_SERVER_CLIENT_ID,
  TRANSCODE_SERVER_GROUP_ID,
} from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CloudModule,
    ClientsModule,
    ClientsModule.register([
      {
        name: 'TRANSCODE_SERVER',
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
      },
    ]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
