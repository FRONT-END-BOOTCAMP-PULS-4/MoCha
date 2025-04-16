// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

import { LoginUseCase } from '@/application/auth/usecases/LoginUseCase';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: '이메일과 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const usecase = new LoginUseCase();
    const { access_token, refresh_token, user } = await usecase.execute({ email, password });

    const res = NextResponse.json({
      success: true,
      access_token,
      user,
    });

    res.cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
    });

    return res;
  } catch (err: any) {
    console.error('로그인 에러:', err.message);
    const isAuthError = err.message.includes('비밀번호') || err.message.includes('존재하지');
    return NextResponse.json(
      { success: false, error: err.message },
      { status: isAuthError ? 401 : 500 }
    );
  }
}
