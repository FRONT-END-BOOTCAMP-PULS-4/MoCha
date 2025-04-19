import { User } from '../entities/User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByNickname(nickname: string): Promise<User | null>;
  findByNicknameAndPhone(nickname: string, phoneNumber: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
}
