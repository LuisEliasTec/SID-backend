import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './entities/user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './entities/employee/employee.module';
import { TurnModule } from './entities/turn/turn.module';
import { JobTitleModule } from './entities/job-title/job-title.module';
import { RoleModule } from './entities/role/role.module';
import { CustomerModule } from './entities/customer/customer.module';
import { SurgeryModule } from './entities/surgery/surgery.module';
import { AllergyModule } from './entities/allergy/allergy.module';
import { VaccineModule } from './entities/vaccine/vaccine.module';
import { MedicineModule } from './entities/medicine/medicine.module';
import { DiseaseModule } from './entities/disease/disease.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.get('MONGO_DB_USER')}:${config.get(
          'MONGO_DB_PASSWORD',
        )}@${config.get('MONGO_DB_SERVER_NAME')}:${config.get(
          'MONGO_DB_PORT',
        )}/${config.get('MONGO_DB_NAME')}?authSource=admin`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    EmployeeModule,
    TurnModule,
    JobTitleModule,
    RoleModule,
    CustomerModule,
    SurgeryModule,
    AllergyModule,
    VaccineModule,
    MedicineModule,
    DiseaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
