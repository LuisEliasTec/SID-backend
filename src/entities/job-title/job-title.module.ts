import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobTitleController } from './job-title.controller';
import { JobTitle, JobTitleSchema } from './job-title.schema';
import { JobTitleService } from './job-title.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobTitle.name, schema: JobTitleSchema },
    ]),
  ],
  controllers: [JobTitleController],
  providers: [JobTitleService],
  exports: [JobTitleService],
})
export class JobTitleModule {}
