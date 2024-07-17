import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositoryProvider } from 'src/typeorm/providers/user-respository.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryProvider],
  exports: [UsersService, UserRepositoryProvider]
})
export class UsersModule {}
