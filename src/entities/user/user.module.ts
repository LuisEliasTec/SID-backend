import { Module } from '@nestjs/common';
import { UserDependenciesModule } from './user-dependecies.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserDependenciesModule],
  controllers: [UserController],
})
export class UserModule {}
