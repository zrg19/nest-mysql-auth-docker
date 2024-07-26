import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { TaskModule } from './task/task.module';
import { LoggerService } from './services/logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, TaskModule],
  controllers: [AppController],
  providers: [ 
    {provide: APP_INTERCEPTOR, useClass: LoggerInterceptor}, 
    AppService, 
    LoggerService
  ],
})
export class AppModule {}
