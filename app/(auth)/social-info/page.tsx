'use client';

import ErrorMessage from '@/app/components/auth/ErrorMessage';
import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';
import Link from 'next/link';
import LogoImage from '@/app/components/auth/LogoImage';
import Title from '@/app/components/auth/Title';
import { useState } from 'react';

export default function SocialInfoPage() {
  const [nicknameError, setNicknameError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);

  return (
    <div>
      {/* 로고 */}
      <LogoImage />
      {/* 타이틀 */}
      <Title>추가 정보 입력</Title>
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
        <div>
          <Input placeholder="전화번호를를 입력해주세요." id="phone_number" className="w-full" />
        </div>
        <ErrorMessage>{phoneNumberError ? '전화번호 에러입니다.' : ''}</ErrorMessage>
      </div>
      {/* 나중에 입력하기 */}
      <div className="my-4">
        <Link
          href="/"
          className="bg-gray-4 block w-full rounded-md px-3 py-2 text-center text-white"
        >
          나중에 입력하기
        </Link>
      </div>
      {/* 안내 메세지 */}
      <div className="text-gray-6 text-center text-sm leading-6">
        <p>마이페이지에서 언제든지 수정 가능합니다.</p>
        <p>단, 닉네임과 전화번호로 아이디를 찾을 수 있습니다.</p>
      </div>
    </div>
  );
}
