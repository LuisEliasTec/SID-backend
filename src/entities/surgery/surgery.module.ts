import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurgeryController } from './surgery.controller';
import { Surgery, SurgerySchema } from './surgery.schema';
import { SurgeryService } from './surgery.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Surgery.name, schema: SurgerySchema }]),
  ],
  controllers: [SurgeryController],
  providers: [SurgeryService],
  exports: [SurgeryService],
})
export class SurgeryModule {}
