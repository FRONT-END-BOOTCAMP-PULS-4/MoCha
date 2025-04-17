import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/app/shared/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { nickname, phoneNumber } = await req.json();

    // 기본 유효성 검사
    if (!nickname || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: '닉네임과 전화번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Supabase에서 사용자 찾기
    const { data: user, error } = await supabase
      .from('user')
      .select('email')
      .eq('nickname', nickname)
      .eq('phone_number', phoneNumber)
      .single();
    console.log('user: ', user);

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: '일치하는 계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 성공 시 이메일 반환
    return NextResponse.json({ success: true, email: user.email }, { status: 200 });
  } catch (err: any) {
    console.error('아이디 찾기 에러:', err);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
