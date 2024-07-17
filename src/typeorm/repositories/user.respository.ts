import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  // You can add custom methods here if needed
}
