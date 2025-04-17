import { NextRequest, NextResponse } from 'next/server';

import { GetUserByTokenUseCase } from '@/application/auth/usecases/GetUserByTokenUseCase';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ success: false, error: '토큰 없음' }, { status: 401 });
    }

    const usecase = new GetUserByTokenUseCase();
    const user = await usecase.execute(token);

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || '유저 정보 확인 실패' },
      { status: 401 }
    );
  }
}
