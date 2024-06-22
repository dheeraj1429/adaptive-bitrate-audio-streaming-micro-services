import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CloudService {
  uploadFile(file: Express.Multer.File): string {
    const rootPath = process.cwd();
    const distributionPath = path.join(rootPath, 'upload', file.originalname);
    try {
      fs.writeFileSync(distributionPath, file.buffer);
    } catch (err) {
      throw new InternalServerErrorException(
        'Error writing upload file distribution',
      );
    }
    return distributionPath;
  }
}
