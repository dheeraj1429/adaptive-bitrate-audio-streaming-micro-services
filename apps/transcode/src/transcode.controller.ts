import { Controller, Get } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EVENTS } from '@app/common';

@Controller()
export class TranscodeController {
  constructor(private readonly transcodeService: TranscodeService) {}

  @MessagePattern(EVENTS.AUDIO_TRANSCODE)
  async audioTranscode(@Payload() payload: { uploadedFile: string }) {
    return this.transcodeService.transcodeAudioFile(payload);
  }
}
