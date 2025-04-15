'use client';

import ErrorMessage from '@/app/components/auth/ErrorMessage';
import Image from 'next/image';
import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';
import { useState } from 'react';

export default function SignupPage() {
  const [emailError, setEmailError] = useState(true);
  const [codeError, setCodeError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(true);
  const [nicknameError, setNicknameError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);

  return (
    <div>
      {/* 로고 */}
      <div className="flex justify-center">
        <Image src="/images/mocha_logo.svg" alt="Mocha_logo" width={120} height={30} />
      </div>
      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-center text-xl font-semibold">회원가입</h1>
      </div>
      {/* 회원가입 폼 */}
      <form className="mb-4 flex flex-col gap-4">
        {/* 이메일 */}
        <div>
          <Label label="이메일" htmlFor="email" />
          <div className="flex gap-2">
            <Input placeholder="이메일을 입력해주세요." id="email" />
            <button className="w-full rounded-md bg-blue-100 px-3 py-2">인증번호 발송</button>
          </div>
          <ErrorMessage>{emailError ? '이메일 에러입니다.' : ''}</ErrorMessage>
        </div>
        {/* 인증번호 확인 */}
        <div>
          <Label label="인증번호" htmlFor="code" />
          <div className="flex gap-2">
            <Input placeholder="인증번호를 입력해주세요." id="code" />
            <button className="w-full rounded-md bg-blue-100 px-3 py-2">인증번호 확인</button>
          </div>
          <ErrorMessage>{codeError ? '코드 에러입니다.' : ''}</ErrorMessage>
        </div>
        {/* 비밀번호 */}
        <div>
          <Label label="비밀번호" htmlFor="password" />
          <div className="flex gap-2">
            <Input
              placeholder="비밀번호를 입력해주세요."
              id="password"
              className="w-full"
              type="password"
            />
          </div>
          <ErrorMessage>{passwordError ? '비밀번호 에러입니다.' : ''}</ErrorMessage>
        </div>
        {/* 비밀번호 확인*/}
        <div>
          <Label label="비밀번호 확인" htmlFor="password-check" />
          <div className="flex gap-2">
            <Input
              placeholder="비밀번호를 다시 입력해주세요."
              id="password-check"
              className="w-full"
              type="password"
            />
          </div>
          <ErrorMessage>{passwordCheckError ? '비밀번호 확인 에러입니다.' : ''}</ErrorMessage>
        </div>
        {/* 닉네임 */}
        <div>
          <Label label="닉네임" htmlFor="nickname" />
          <div className="flex gap-2">
            <Input placeholder="닉네임을 입력해주세요." id="nickname" />
            <button className="w-full rounded-md bg-blue-100 px-3 py-2">중복 확인</button>
          </div>
          <ErrorMessage>{nicknameError ? '닉네임 에러입니다.' : ''}</ErrorMessage>
        </div>
        {/* 전화번호 */}
        <div>
          <Label label="전화번호" htmlFor="phone_number" />
          <div className="flex gap-2">
            <Input placeholder="전화번호를 입력해주세요." id="phone_number" className="w-full" />
          </div>
          <ErrorMessage>{phoneNumberError ? '전화번호 에러입니다.' : ''}</ErrorMessage>
        </div>
      </form>
      {/* 버튼 */}
      <div className="flex gap-4">
        <button className="w-full rounded-md bg-red-100 px-3 py-2">취소</button>
        <button className="w-full rounded-md bg-blue-100 px-3 py-2">회원가입</button>
      </div>
    </div>
  );
}
