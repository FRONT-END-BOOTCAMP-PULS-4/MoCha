import { supabase } from '@/app/shared/lib/supabase';
import { verifyAccessToken } from '@/infra/auth/utils/jwt';

export class GetUserByTokenUseCase {
  async execute(token: string) {
    const payload = verifyAccessToken(token); // 검증 및 payload 추출
    const { id } = payload;

    const { data: user, error } = await supabase
      .from('user')
      .select('id, email, nickname, phone_number, provider')
      .eq('id', id)
      .single();

    if (error || !user) {
      throw new Error('유저 정보를 찾을 수 없습니다.');
    }

    return user;
  }
}
