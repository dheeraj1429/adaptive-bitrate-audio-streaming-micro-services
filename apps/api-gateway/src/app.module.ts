import { Module } from '@nestjs/common';
import { UploadModule } from './upload';

@Module({
  imports: [UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
