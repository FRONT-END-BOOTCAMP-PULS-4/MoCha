import { NextRequest, NextResponse } from 'next/server';

import { SendCodeUseCase } from '@/application/auth/usecases/SendCodeUseCase';
import { NodemailerEmailService } from '@/infra/auth/services/NodemailerEmailService';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // 이메일 필드 유효성 검사
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 });
    }

    // 유스케이스 실행
    const emailService = new NodemailerEmailService();
    const usecase = new SendCodeUseCase(emailService);

    const token = await usecase.execute(email, 'signup');

    // 성공 응답
    return NextResponse.json({ token }, { status: 200 });
  } catch (err: any) {
    // 이메일 중복 에러
    if (err.message === '이미 가입된 이메일입니다.') {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }

    // 그 외 예외 상황
    console.error('인증코드 전송 에러:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
