import { NextRequest, NextResponse } from 'next/server';

import { SignupUseCase } from '@/application/auth/usecases/SignupUseCase';
import { SupabaseUserRepository } from '@/infra/auth/repositories/SupabaseUserRepository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ['email', 'password', 'nickname', 'phone_number', 'token'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `필수 항목이 누락되었습니다: ${field}` },
          { status: 400 }
        );
      }
    }

    const usecase = new SignupUseCase(new SupabaseUserRepository());
    const user = await usecase.execute(body);

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err: any) {
    console.error('회원가입 에러:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
