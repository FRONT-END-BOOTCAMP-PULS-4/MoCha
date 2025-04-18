'use client';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import Input from '@/app/shared/ui/input/Input';
import Label from '@/app/shared/ui/label/Label';
import Link from 'next/link';
import { useState } from 'react';

export default function SocialInfoPage() {
  const [user, setUser] = useState({
    nickname: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    phone_number: '',
  });

  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const isValidNickname = (nickname: string) => /^[a-zA-Z0-9가-힣]{2,8}$/.test(nickname);

  const errorMessages = {
    nickname: '2~8자의 문자 또는 숫자만 사용할 수 있습니다.',
    phone_number: '전화번호 형식이 올바르지 않습니다.',
  };

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
          <Input
            placeholder="닉네임을 입력해주세요."
            id="nickname"
            value={user.nickname}
            onChange={(e) => setUser((prev) => ({ ...prev, nickname: e.target.value }))}
            error={!!errors.nickname}
          />
          <button
            className="w-full rounded-md bg-blue-100 px-3 py-2"
            onClick={() => {
              if (!isValidNickname(user.nickname)) {
                setErrors((prev) => ({ ...prev, nickname: 'invalid' }));
                setIsNicknameVerified(false);
              } else {
                // 예시: 중복 확인 API 호출 등
                setErrors((prev) => ({ ...prev, nickname: '' }));
                setIsNicknameVerified(true);
              }
            }}
          >
            중복 확인
          </button>
        </div>

        <MessageZone
          errorMessage={
            errors.nickname === 'invalid'
              ? errorMessages.nickname
              : errors.nickname === 'duplicated'
                ? '이미 사용 중인 닉네임입니다.'
                : ''
          }
          successMessage={
            user.nickname &&
            isValidNickname(user.nickname) &&
            errors.nickname === '' &&
            isNicknameVerified
              ? '사용 가능한 닉네임입니다.'
              : ''
          }
        />
      </div>

      {/* 전화번호 */}
      <div className="mt-6">
        <Label label="전화번호" htmlFor="phone_number" />
        <Input
          placeholder="전화번호를 입력해주세요."
          id="phone_number"
          className="w-full"
          value={user.phone_number}
          onChange={(e) => setUser((prev) => ({ ...prev, phone_number: e.target.value }))}
          error={!!errors.phone_number}
        />
        <MessageZone errorMessage={errors.phone_number ? errorMessages.phone_number : ''} />
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
