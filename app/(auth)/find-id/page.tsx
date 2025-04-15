'use client';

import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';
import LogoImage from '@/app/components/auth/LogoImage';
import Title from '@/app/components/auth/Title';
import { useState } from 'react';

export default function FindIdPage() {
  const [nicknameError, setNicknameError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);

  return (
    <div>
      {/* 로고 */}
      <LogoImage />
      {/* 타이틀 */}
      <Title>아이디 찾기</Title>
      {/* 아이디 찾기 폼 */}
      <form className="mb-4 flex flex-col gap-2">
        {/* 닉네임 */}
        <div>
          <Label label="닉네임" htmlFor="nickname" />
          <div>
            <Input placeholder="닉네임을 입력해주세요." id="nickname" className="mb-1 w-full" />
            <div className="text-error min-h-[16px] text-xs">
              {nicknameError ? '닉네임 에러입니다.' : ''}
            </div>
          </div>
        </div>
        {/* 전화번호 */}
        <div>
          <Label label="전화번호" htmlFor="phone_number" />
          <div>
            <Input
              placeholder="전화번호를 입력해주세요."
              id="phone_number"
              className="mb-1 w-full"
            />
            <div className="text-error min-h-[16px] text-xs">
              {phoneNumberError ? '전화번호 에러입니다.' : ''}
            </div>
          </div>
        </div>
      </form>
      <div className="mb-4">
        <button className="w-full rounded-md bg-blue-100 px-3 py-2">아이디 찾기</button>
      </div>
      <div className="mb-4">
        <button className="w-full rounded-md bg-blue-100 px-3 py-2">취소</button>
      </div>
    </div>
  );
}
