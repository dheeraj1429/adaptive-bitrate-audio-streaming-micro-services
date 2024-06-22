import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

@Injectable()
export class TranscodeService {
  protected readonly logger = new Logger(TranscodeService.name);

  async transcodeAudioFile({ uploadedFile }: { uploadedFile: string }) {
    const outputDir = '64k';
    const outputPath = join(outputDir, 'output.m3u8');

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir);
    }

    const cmd = '/opt/homebrew/bin/ffmpeg';
    const args = [
      '-i',
      uploadedFile,
      '-b:a',
      '64k',
      '-hls_time',
      '10',
      '-hls_playlist_type',
      'vod',
      outputPath,
    ];
    var proc = spawn(cmd, args);

    proc.stdout.on('data', (data) => {
      this.logger.log(`stdout: ${data}`);
    });

    proc.stderr.on('data', (data) => {
      this.logger.log(`stderr: ${data}`);
    });

    proc.on('close', (code) => {
      this.logger.log(`child process exited with code ${code}`);
      if (code === 0) {
        this.logger.log('Transcoding finished successfully');
      } else {
        this.logger.error('Transcoding failed');
      }
    });
  }
}
