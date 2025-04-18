import { NextRequest, NextResponse } from 'next/server';

import { CheckNicknameUseCase } from '@/application/auth/usecases/CheckNicknameUseCase';

export async function POST(req: NextRequest) {
  try {
    const { nickname } = await req.json();

    if (!nickname || typeof nickname !== 'string') {
      return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
    }

    const usecase = new CheckNicknameUseCase();
    const isAvailable = await usecase.execute(nickname);

    if (isAvailable) {
      return NextResponse.json({ available: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
    }
  } catch (err) {
    console.error('닉네임 중복 확인 에러:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
