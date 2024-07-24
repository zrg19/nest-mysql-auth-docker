import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { TaskModule } from './task/task.module';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
