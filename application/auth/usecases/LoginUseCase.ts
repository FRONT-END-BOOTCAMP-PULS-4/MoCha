import { generateAccessToken, generateRefreshToken } from '@/infra/auth/utils/jwt';

import { supabase } from '@/app/shared/lib/supabase';
import { LoginDto } from '@/domain/auth/dto/LoginDto';
import bcrypt from 'bcryptjs';

export class LoginUseCase {
  async execute({ email, password }: LoginDto) {
    const { data: user, error } = await supabase
      .from('user')
      .select('id, email, password, nickname, phone_number, provider, deleted_at')
      .eq('email', email)
      .single();

    if (error || !user || user.deleted_at) {
      throw new Error('존재하지 않는 계정입니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const payload = { id: user.id, email: user.email };
    const access_token = generateAccessToken(payload);
    const refresh_token = generateRefreshToken(payload);

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        phone_number: user.phone_number,
        provider: user.provider,
      },
    };
  }
}
