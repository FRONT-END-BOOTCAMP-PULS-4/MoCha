import { User } from '../entities/User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: {
    email: string;
    password: string;
    nickname: string;
    phone_number: string;
    provider: string;
  }): Promise<User>;
}
