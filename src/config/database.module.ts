import { Module } from "@nestjs/common";
import * as config from 'config';
import { User } from "src/typeorm/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/typeorm/entities/Task";

const dbConfig = config.get('db');

@Module({
    imports: [TypeOrmModule.forRoot({
        type: dbConfig.type,
        host: process.env.DB_HOST || dbConfig.host,
        port: process.env.DB_PORT || dbConfig.port,
        username: process.env.DB_USER || dbConfig.username,
        password: process.env.DB_PASSWORD || dbConfig.password,
        database: process.env.DB_DATABASE || dbConfig.database,
        entities: [User, Task],
        synchronize: dbConfig.synchronize,
      }), TypeOrmModule.forFeature([User, Task])]
})
export class DatabaseModule {}