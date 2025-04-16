'use client';

import LogoImage from '@/app/components/auth/LogoImage';
import Title from '@/app/components/auth/Title';
import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';
import { useState } from 'react';
import { errorMessages } from '../signup/page';

export default function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [errors, setErrors] = useState({
    email: false,
    code: false,
    password: false,
    passwordCheck: false,
  });

  const handleSendVerificationCode = async () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('인증번호 발송 실패');

      alert('인증번호가 이메일로 전송되었습니다.');
    } catch (err) {
      console.error('인증 요청 실패:', err);
    }
  };

  const handleVerifyCode = () => {
    if (code === '123456') {
      setErrors((prev) => ({ ...prev, code: false }));
      setIsVerified(true);
    } else {
      setErrors((prev) => ({ ...prev, code: true }));
      setIsVerified(false);
    }
  };

  const handleChangePassword = async () => {
    const passwordValid = isValidPassword(password);
    const passwordMatch = doPasswordsMatch(password, passwordCheck);

    if (!passwordValid || !passwordMatch) {
      setErrors({
        ...errors,
        password: !passwordValid,
        passwordCheck: !passwordMatch,
      });
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('비밀번호 변경 실패');

      alert('비밀번호가 변경되었습니다.');
    } catch (err) {
      console.error('비밀번호 변경 실패:', err);
    }
  };

  return (
    <div>
      <LogoImage />
      <Title>비밀번호 찾기</Title>

      {/* 이메일 입력 */}
      <div>
        <Label label="이메일" htmlFor="email" />
        <Input
          id="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: !isValidEmail(e.target.value) }));
          }}
          className="mb-1 w-full"
          error={errors.email}
          disabled={isVerified}
        />
        <MessageZone errorMessage={errors.email ? errorMessages.email : ''} />
        <button
          className="mt-2 w-full rounded-md bg-blue-100 px-3 py-2"
          onClick={handleSendVerificationCode}
          disabled={isVerified || !isValidEmail(email)}
        >
          인증번호 발송
        </button>
      </div>

      {/* 인증번호 입력 */}
      <div className="mt-4">
        <Label label="인증번호" htmlFor="code" />
        <Input
          id="code"
          placeholder="인증번호를 입력해주세요."
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErrors((prev) => ({ ...prev, code: false }));
          }}
          className="mb-1 w-full"
          error={errors.code}
          disabled={isVerified}
        />
        <MessageZone
          errorMessage={errors.code ? errorMessages.code : ''}
          successMessage={isVerified ? '인증이 완료되었습니다.' : ''}
        />
        <button
          className="mt-2 w-full rounded-md bg-blue-100 px-3 py-2"
          onClick={handleVerifyCode}
          disabled={isVerified}
        >
          인증번호 확인
        </button>
      </div>

      {/* 인증 성공 시 비밀번호 변경 UI */}
      {isVerified && (
        <div className="mt-6">
          <div>
            <Label label="비밀번호" htmlFor="password" />
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: !isValidPassword(e.target.value),
                }));
              }}
              className="w-full"
              error={errors.password}
            />
            <MessageZone errorMessage={errors.password ? errorMessages.password : ''} />
          </div>

          <div className="mt-2">
            <Label label="비밀번호 확인" htmlFor="passwordCheck" />
            <Input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  passwordCheck: !doPasswordsMatch(password, e.target.value),
                }));
              }}
              className="w-full"
              error={errors.passwordCheck}
            />
            <MessageZone errorMessage={errors.passwordCheck ? errorMessages.passwordCheck : ''} />
          </div>

          <div className="mt-4 flex gap-4">
            <button className="w-full rounded-md bg-red-100 px-3 py-2">취소</button>
            <button
              className="w-full rounded-md bg-blue-100 px-3 py-2"
              onClick={handleChangePassword}
              disabled={!isValidPassword(password) || !doPasswordsMatch(password, passwordCheck)}
            >
              변경
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
