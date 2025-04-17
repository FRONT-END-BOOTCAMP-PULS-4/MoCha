'use client';

import { isValidNickname, isValidPhoneNumber } from '@/app/shared/utils/validation';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import Input from '@/app/shared/ui/input/Input';
import Label from '@/app/shared/ui/label/Label';
import { useState } from 'react';
import { errorMessages } from '../signup/page';

export default function FindIdPage() {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errors, setErrors] = useState({
    nickname: false,
    phoneNumber: false,
    notFound: false,
  });

  const isFormValid = isValidNickname(nickname) && isValidPhoneNumber(phoneNumber);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setErrors((prev) => ({
      ...prev,
      nickname: !isValidNickname(value),
      notFound: false,
    }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setErrors((prev) => ({
      ...prev,
      phoneNumber: !isValidPhoneNumber(value),
      notFound: false,
    }));
  };

  const handleFindId = async () => {
    if (!isFormValid) {
      setErrors({
        nickname: !isValidNickname(nickname),
        phoneNumber: !isValidPhoneNumber(phoneNumber),
        notFound: false,
      });
      return;
    }

    try {
      const res = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, phoneNumber }),
      });

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, notFound: true }));
        return;
      }

      const data = await res.json();
      alert(`가입된 이메일은: ${data.email}`);
    } catch (err) {
      console.error('아이디 찾기 실패:', err);
      setErrors((prev) => ({ ...prev, notFound: true }));
    }
  };

  return (
    <div>
      <LogoImage />
      <Title>아이디 찾기</Title>

      <form className="mb-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
        {/* 닉네임 */}
        <div>
          <Label label="닉네임" htmlFor="nickname" />
          <Input
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요."
            className="mb-1 w-full"
            error={errors.nickname}
          />
          <MessageZone errorMessage={errors.nickname ? errorMessages.nickname : ''} />
        </div>

        {/* 전화번호 */}
        <div>
          <Label label="전화번호" htmlFor="phone_number" />
          <Input
            id="phone_number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="전화번호를 입력해주세요."
            className="mb-1 w-full"
            error={errors.phoneNumber}
          />
          <MessageZone errorMessage={errors.phoneNumber ? errorMessages.phoneNumber : ''} />
        </div>
      </form>

      <div className="mb-4">
        <button
          className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
          onClick={handleFindId}
          disabled={!isFormValid}
        >
          아이디 찾기
        </button>
      </div>
      <div className="mb-4">
        <button className="w-full rounded-md bg-red-100 px-3 py-2">취소</button>
      </div>
    </div>
  );
}
