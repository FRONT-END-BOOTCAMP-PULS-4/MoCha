import { supabase } from '@/app/shared/lib/supabase';

export class CheckNicknameUseCase {
  async execute(nickname: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user')
      .select('id')
      .eq('nickname', nickname)
      .single();

    // 존재하지 않으면 true (사용 가능), 존재하면 false
    return !data;
  }
}
