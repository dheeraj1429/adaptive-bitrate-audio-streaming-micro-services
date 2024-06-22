import { CloudService, EVENTS } from '@app/common';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UploadService {
  constructor(
    @Inject('TRANSCODE_SERVER')
    protected readonly transcodeService: ClientKafka,
    protected readonly cloudService: CloudService,
  ) {}

  uploadFile(file: Express.Multer.File) {
    const uploadedFile = this.cloudService.uploadFile(file);
    if (uploadedFile) {
      this.transcodeService.emit(EVENTS.AUDIO_TRANSCODE, { uploadedFile });
      return { message: 'File uploaded successfully waiting for processing.' };
    }
    throw new InternalServerErrorException('Cloud not upload file properly');
  }
}
