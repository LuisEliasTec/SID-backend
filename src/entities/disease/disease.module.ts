import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiseaseController } from './disease.controller';
import { Disease, DiseaseSchema } from './disease.schema';
import { DiseaseService } from './disease.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disease.name, schema: DiseaseSchema }]),
  ],
  controllers: [DiseaseController],
  providers: [DiseaseService],
  exports: [DiseaseService],
})
export class DiseaseModule {}
