'use client';

import { doPasswordsMatch, isValidEmail, isValidPassword } from '@/app/shared/utils/validation';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import { Button } from '@/app/shared/ui/button/Button';
import Input from '@/app/shared/ui/input/Input';
import Label from '@/app/shared/ui/label/Label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { errorMessages } from '../signup/page';

export default function FindPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [verificationToken, setVerificationToken] = useState('');

  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [errors, setErrors] = useState({
    email: false,
    code: false,
    password: false,
    passwordCheck: false,
  });

  const [serverError, setServerError] = useState('');

  const handleSendVerificationCode = async () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      setCodeSent(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/send-code/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || '인증번호 발송 실패');
        setCodeSent(false);
        return;
      }

      setVerificationToken(data.token);
      setServerError('');
      setErrors((prev) => ({ ...prev, email: false }));
      setCodeSent(true);
    } catch (err) {
      console.error('인증 요청 실패:', err);
      setServerError('서버 오류로 인증번호 발송에 실패했습니다.');
      setCodeSent(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationToken || !code) {
      setServerError('인증번호가 발송되지 않았거나 입력되지 않았습니다.');
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify({ token: verificationToken, code }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok && data.verified) {
        setErrors((prev) => ({ ...prev, code: false }));
        setServerError('');
        setIsVerified(true);
      } else {
        setErrors((prev) => ({ ...prev, code: true }));
        setServerError('인증번호가 일치하지 않습니다.');
        setIsVerified(false);
      }
    } catch (err) {
      console.error('인증번호 확인 실패:', err);
      setErrors((prev) => ({ ...prev, code: true }));
      setServerError('인증번호 확인 중 서버 오류가 발생했습니다.');
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
        body: JSON.stringify({
          email,
          password,
          token: verificationToken,
          code,
        }),
      });

      if (!res.ok) throw new Error('비밀번호 변경 실패');

      router.push('/login');
    } catch (err) {
      console.error('비밀번호 변경 실패:', err);
      setServerError('비밀번호 변경에 실패했습니다.');
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
            setServerError('');
          }}
          className="w-full"
          error={errors.email}
          disabled={isVerified}
        />
        <MessageZone
          errorMessage={serverError || (errors.email ? errorMessages.email : '')}
          successMessage={
            isValidEmail(email) && !errors.email && codeSent
              ? '인증번호가 이메일로 전송되었습니다.'
              : ''
          }
        />

        <Button
          intent={'primary'}
          className="mt-2 w-full"
          onClick={handleSendVerificationCode}
          disabled={isVerified || !isValidEmail(email)}
        >
          인증번호 발송
        </Button>
      </div>

      {/* 인증번호 입력 */}
      <div className="mt-3">
        <Label label="인증번호" htmlFor="code" />
        <Input
          id="code"
          placeholder="인증번호를 입력해주세요."
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErrors((prev) => ({ ...prev, code: false }));
            setServerError('');
          }}
          className="w-full"
          error={errors.code}
          disabled={isVerified}
        />
        <MessageZone
          errorMessage={errors.code ? errorMessages.code : ''}
          successMessage={isVerified ? '인증이 완료되었습니다.' : ''}
        />
        <Button
          intent={'primary'}
          className="mt-2 w-full"
          onClick={handleVerifyCode}
          disabled={isVerified}
        >
          인증번호 확인
        </Button>
        {!isVerified && (
          <Button intent={'cancel'} className="mt-4 w-full" onClick={() => router.back()}>
            취소
          </Button>
        )}
      </div>

      {/* 인증 성공 시 비밀번호 변경 UI */}
      {isVerified && (
        <div className="mt-3">
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

          <div className="mt-1">
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

          <div className="mt-3 flex gap-4">
            <Button intent={'cancel'} className="w-full" onClick={() => router.back()}>
              취소
            </Button>
            <Button
              intent={'primary'}
              className="w-full"
              onClick={handleChangePassword}
              disabled={!isValidPassword(password) || !doPasswordsMatch(password, passwordCheck)}
            >
              변경
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
