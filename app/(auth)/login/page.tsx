'use client';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';
import { isValidEmail } from '@/app/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { errorMessages } from '../signup/page';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    login: false,
  });

  const isFormValid = isValidEmail(email) && password.trim().length > 0;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: !isValidEmail(value),
      login: false,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: value.trim().length === 0,
      login: false,
    }));
  };

  const handleLogin = async () => {
    const emailValid = isValidEmail(email);
    const passwordValid = password.trim().length > 0;

    if (!emailValid || !passwordValid) {
      setErrors((prev) => ({
        ...prev,
        email: !emailValid,
        password: !passwordValid,
      }));
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, login: true }));
        return;
      }

      // 성공 시 처리 (예: redirect)
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrors((prev) => ({ ...prev, login: true }));
    }
  };

  return (
    <div>
      <LogoImage />
      <Title>로그인</Title>

      <form className="mb-4 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        {/* 이메일 */}
        <div>
          <Label label="이메일" htmlFor="email" />
          <Input
            placeholder="이메일을 입력해주세요."
            id="email"
            className="w-full"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
          />
          <MessageZone errorMessage={errors.email ? errorMessages.email : ''} />
        </div>

        {/* 비밀번호 */}
        <div>
          <Label label="비밀번호" htmlFor="password" />
          <Input
            placeholder="비밀번호를 입력해주세요."
            id="password"
            className="w-full"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
          />
          <MessageZone
            errorMessage={
              errors.password
                ? errorMessages.password
                : errors.login
                  ? '이메일 또는 비밀번호가 올바르지 않습니다.'
                  : ''
            }
          />
        </div>
      </form>

      {/* 로그인 버튼 */}
      <div className="mb-4">
        <button
          className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      {/* 하단 링크 */}
      <div className="flex justify-center gap-4 text-sm">
        <Link href="/signup" className="hover:cursor-pointer">
          회원가입
        </Link>
        <span>|</span>
        <Link href="/find-id" className="hover:cursor-pointer">
          아이디 찾기
        </Link>
        <span>|</span>
        <Link href="/find-password" className="hover:cursor-pointer">
          비밀번호 찾기
        </Link>
      </div>

      {/* 간편 로그인 */}
      <div>
        <div className="my-6 flex items-center">
          <div className="border-gray-2 flex-grow border-t" />
          <span className="text-gray-6 mx-4 text-sm">간편 로그인</span>
          <div className="border-gray-2 flex-grow border-t" />
        </div>

        <div className="mt-2 flex flex-col justify-center gap-4">
          <button className="border-gray-3 flex justify-center gap-2 rounded-md border bg-white px-4 py-3">
            <Image
              src="/images/social/google-logo.svg"
              alt="구글 로그인 아이콘"
              width={20}
              height={20}
            />
            <div>구글로 로그인하기</div>
          </button>
          <button className="flex justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-3">
            <Image
              src="/images/social/kakao-logo.svg"
              alt="카카오 로그인 아이콘"
              width={20}
              height={20}
            />
            <div>카카오톡으로 로그인하기</div>
          </button>
        </div>
      </div>
    </div>
  );
}
