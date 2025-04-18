import { supabase } from '@/app/shared/lib/supabase';
import { User } from '@/domain/auth/entities/User';
import { UserRepository } from '@/domain/auth/repositories/UserRepository';

export class SupabaseUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { data } = await supabase.from('user').select('*').eq('email', email).single();

    if (!data) return null;

    return new User(
      data.id,
      data.email,
      data.nickname,
      data.phone_number,
      data.created_at,
      data.deleted_at,
      data.provider
    );
  }

  async createUser(data: {
    email: string;
    password: string;
    nickname: string;
    phone_number: string;
    provider: string;
  }): Promise<User> {
    const { data: newUser, error } = await supabase.from('user').insert(data).select().single();

    if (error || !newUser) {
      throw new Error('회원가입에 실패했습니다.');
    }

    return new User(
      newUser.id,
      newUser.email,
      newUser.nickname,
      newUser.phone_number,
      newUser.created_at,
      newUser.deleted_at,
      newUser.provider
    );
  }
}
