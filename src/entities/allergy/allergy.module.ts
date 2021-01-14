import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllergyController } from './allergy.controller';
import { Allergy, AllergySchema } from './allergy.schema';
import { AllergyService } from './allergy.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Allergy.name, schema: AllergySchema }]),
  ],
  controllers: [AllergyController],
  providers: [AllergyService],
  exports: [AllergyService],
})
export class AllergyModule {}
