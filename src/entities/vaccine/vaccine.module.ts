import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineController } from './vaccine.controller';
import { Vaccine, VaccineSchema } from './vaccine.schema';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vaccine.name, schema: VaccineSchema }]),
  ],
  controllers: [VaccineController],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class VaccineModule {}
