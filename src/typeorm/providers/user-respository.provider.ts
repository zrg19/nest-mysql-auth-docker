import { DataSource } from "typeorm";
import { UserRepository } from "../repositories/user.respository";
export const UserRepositoryProvider = {
    provide: UserRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserRepository(dataSource);
    },
    inject: [DataSource],
  }