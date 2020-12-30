import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurnController } from './turn.controller';
import { Turn, TurnSchema } from './turn.schema';
import { TurnService } from './turn.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Turn.name, schema: TurnSchema }]),
    ],
    controllers: [TurnController],
    providers: [TurnService],
    exports: [TurnService],
})
export class TurnModule { }
