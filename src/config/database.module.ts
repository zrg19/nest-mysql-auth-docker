import { Module } from "@nestjs/common";
import * as config from 'config';
import { User } from "src/typeorm/entities/User";
import { TypeOrmModule } from "@nestjs/typeorm";

const dbConfig = config.get('db');

@Module({
    imports: [TypeOrmModule.forRoot({
        ...dbConfig,
        entities: [User],
        synchronize: dbConfig.synchronize,
      })]
})
export class DatabaseModule {}