import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/app/shared/lib/supabase';
import { verifyEmailToken } from '@/application/auth/usecases/SendCodeUseCase';
import bcrypt from 'bcryptjs';

export async function PATCH(req: NextRequest) {
  try {
    const { email, password, token, code } = await req.json();

    if (!email || !password || !token || !code) {
      return NextResponse.json(
        { error: '이메일, 비밀번호, 인증토큰, 인증번호가 필요합니다.' },
        { status: 400 }
      );
    }

    // 1. 토큰 검증 및 이메일/코드 일치 확인
    let payload;
    try {
      payload = verifyEmailToken(token); // { email: string, code: string }
    } catch {
      return NextResponse.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, { status: 401 });
    }

    if (payload.email !== email || payload.code !== code) {
      return NextResponse.json({ error: '인증번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 사용자 존재 확인
    const { data: user, error: findError } = await supabase
      .from('user')
      .select('id')
      .eq('email', email)
      .single();

    if (findError || !user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 4. 비밀번호 업데이트
    const { error: updateError } = await supabase
      .from('user')
      .update({ password: hashedPassword })
      .eq('email', email);

    if (updateError) {
      console.error('비밀번호 업데이트 실패:', updateError);
      return NextResponse.json({ error: '비밀번호 변경에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '비밀번호가 변경되었습니다.' });
  } catch (err) {
    console.error('비밀번호 재설정 에러:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
