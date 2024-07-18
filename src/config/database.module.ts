import { Module } from "@nestjs/common";
import * as config from 'config';
import { User } from "src/typeorm/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/typeorm/entities/Task";

const dbConfig = config.get('db');

@Module({
    imports: [TypeOrmModule.forRoot({
        ...dbConfig,
        entities: [User, Task],
        synchronize: dbConfig.synchronize,
      }), TypeOrmModule.forFeature([User, Task])]
})
export class DatabaseModule {}