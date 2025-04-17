import { NextRequest, NextResponse } from 'next/server';

import { SendCodeUseCase } from '@/application/auth/usecases/SendCodeUseCase';
import { NodemailerEmailService } from '@/infra/auth/services/NodemailerEmailService';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 });
    }

    const emailService = new NodemailerEmailService();
    const usecase = new SendCodeUseCase(emailService);

    const token = await usecase.execute(email, 'reset-password');

    return NextResponse.json({ token }, { status: 200 });
  } catch (err: any) {
    if (err.message === '존재하지 않는 계정입니다.') {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }

    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
