'use client';

import ErrorMessage from '@/app/components/auth/ErrorMessage';
import Input from '@/app/shared/input/Input';
import Label from '@/app/shared/ui/label/Label';
import LogoImage from '@/app/components/auth/LogoImage';
import Title from '@/app/components/auth/Title';
import { useState } from 'react';

export default function FindPasswordPage() {
  const [emailError, setEmailError] = useState(true);
  const [codeError, setCodeError] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(true);

  return (
    <div>
      {/* 로고 */}
      <LogoImage />
      {/* 타이틀 */}
      <Title>비밀번호 찾기</Title>
      {/* 비밀번호 찾기 */}
      {/* 이메일 */}
      <div>
        <Label label="이메일" htmlFor="nickname" />
        <div>
          <Input placeholder="이메일을 입력해주세요." id="nickname" className="mb-1 w-full" />
          <ErrorMessage>{emailError ? '이메일 에러입니다.' : ''}</ErrorMessage>
        </div>
        <button className="mt-2 w-full rounded-md bg-blue-100 px-3 py-2">인증번호 발송</button>
      </div>
      {/* 인증번호 */}
      <div>
        <Label label="인증번호" htmlFor="nickname" />
        <div>
          <Input placeholder="인증번호를 입력해주세요." id="nickname" className="mb-1 w-full" />
          <ErrorMessage>{codeError ? '인증번호 에러입니다.' : ''}</ErrorMessage>
        </div>
        <button className="mt-2 w-full rounded-md bg-blue-100 px-3 py-2">인증번호 확인</button>
      </div>
      {/* 인증 완료 시 비밀번호 변경 */}
      {isVerified && (
        <div>
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
          <div className="mt-4 flex gap-4">
            <button className="w-full rounded-md bg-red-100 px-3 py-2">취소</button>
            <button className="w-full rounded-md bg-blue-100 px-3 py-2">변경</button>
          </div>
        </div>
      )}
    </div>
  );
}
