import { NextRequest, NextResponse } from 'next/server';

import { VerifyCodeUseCase } from '@/application/auth/usecases/VerifyCodeUseCase';

export async function POST(req: NextRequest) {
  try {
    const { token, code } = await req.json();

    // 유효성 검사
    if (!token || !code) {
      return NextResponse.json({ error: '토큰과 인증번호를 모두 입력해주세요.' }, { status: 400 });
    }

    const usecase = new VerifyCodeUseCase();
    const isValid = usecase.execute(token, code);

    if (!isValid) {
      return NextResponse.json({ error: '인증번호가 일치하지 않습니다.' }, { status: 401 });
    }

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (err: any) {
    console.error('인증번호 확인 에러:', err);
    return NextResponse.json({ error: err.message || '서버 오류' }, { status: 400 });
  }
}
