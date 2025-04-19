import { supabase } from '@/app/shared/lib/supabase';
import { User } from '@/domain/user/entities/User';
import { UserRepository } from '@/domain/user/repositories/UserRepository';

export class SupabaseUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase.from('user').select('*').eq('email', email).single();

    if (error || !data) return null;
    return data as User;
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from('user').select('*').eq('id', id).single();

    if (error || !data) return null;
    return data as User;
  }

  async findByNickname(nickname: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('nickname', nickname)
      .single();

    if (error || !data) return null;
    return data as User;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const { data, error } = await supabase.from('user').insert(user).select().single();

    if (error || !data) {
      throw new Error('유저 생성 실패');
    }

    return data as User;
  }
}
