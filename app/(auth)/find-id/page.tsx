'use client';

import { isValidNickname, isValidPhoneNumber } from '@/app/shared/utils/validation';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import Modal from '@/app/components/main/modal/TransactionModal';
import { Button } from '@/app/shared/ui/button/Button';
import Input from '@/app/shared/ui/input/Input';
import Label from '@/app/shared/ui/label/Label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { errorMessages } from '../signup/page';

export default function FindIdPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errors, setErrors] = useState({
    nickname: false,
    phoneNumber: false,
    notFound: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        {/* 닉네임 */}
        <div>
          <Label label="닉네임" htmlFor="nickname" />
          <Input
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요."
            className="w-full"
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
            className="w-full"
            error={errors.phoneNumber}
          />
          <MessageZone errorMessage={errors.phoneNumber ? errorMessages.phoneNumber : ''} />
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="rounded-lg bg-white p-4 text-center">
          <h2 className="mb-4 text-xl font-bold">아이디 찾기 결과</h2>
          <p className="mb-3 text-sm text-gray-700">
            갱갱갱갱갱갱갱갱 님, 입력하신 전화번호로 등록된 아이디는 다음과 같아요.
          </p>
          <div className="rounded-md bg-gray-100 px-4 py-3 text-lg font-semibold">
            yagobo1110@naver.com
          </div>
          <Button intent={'primary'} className="mt-6 w-full">
            로그인하러 가기
          </Button>

          <p className="mt-4 text-sm text-gray-600">
            비밀번호가 기억나지 않으신가요?
            <Link href="/find-password" className="ml-2 text-blue-500 underline">
              비밀번호 찾기
            </Link>
          </p>
        </div>
      </Modal>

      <div className="mt-2 mb-4">
        <Button
          intent={'primary'}
          className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
          onClick={handleFindId}
          disabled={!isFormValid}
        >
          아이디 찾기
        </Button>
      </div>
      <div className="mb-4">
        <Button intent={'cancel'} className="w-full" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </div>
  );
}
