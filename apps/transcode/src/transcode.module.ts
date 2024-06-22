import { Module } from '@nestjs/common';
import { TranscodeController } from './transcode.controller';
import { TranscodeService } from './transcode.service';

@Module({
  imports: [],
  controllers: [TranscodeController],
  providers: [TranscodeService],
})
export class TranscodeModule {}
