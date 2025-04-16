'use client';

import {
  doPasswordsMatch,
  isValidEmail,
  isValidNickname,
  isValidPassword,
  isValidPhoneNumber,
} from '@/app/shared/utils/validation';
import { ChangeEvent, useState } from 'react';

import LogoImage from '@/app/components/auth/LogoImage';
import MessageZone from '@/app/components/auth/MessageZone';
import Title from '@/app/components/auth/Title';
import Input from '@/app/shared/ui/input/Input';
import Label from '@/app/shared/ui/label/Label';

export const errorMessages = {
  email: '유효한 이메일 주소를 입력해주세요.',
  code: '인증번호가 올바르지 않습니다.',
  password: '8~20자, 영문과 숫자를 포함해 입력해주세요.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  nickname: '2~8자의 한글, 영문, 숫자만 사용할 수 있어요.',
  phoneNumber: '숫자만 입력해주세요. (예: 01012345678)',
};

export default function SignupPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    phoneNumber: '',
  });

  const [code, setCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const [errors, setErrors] = useState({
    email: '', // '' | 'invalid' | 'duplicated'
    code: false,
    password: false,
    passwordCheck: false,
    nickname: '', // '' | 'invalid' | 'duplicated'
    phoneNumber: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUser((prev) => {
      const updatedUser = { ...prev, [id]: value };

      setErrors((prevErr) => {
        const newErrors = { ...prevErr };

        if (id === 'email') newErrors.email = isValidEmail(value) ? '' : 'invalid';
        if (id === 'nickname') {
          newErrors.nickname = isValidNickname(value) ? '' : 'invalid';
          setIsNicknameVerified(false); // 닉네임 바뀌면 초기화
        }
        if (id === 'passwordCheck') {
          newErrors.passwordCheck = !doPasswordsMatch(updatedUser.password, value);
        }

        return newErrors;
      });

      return updatedUser;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'email':
        setErrors((prev) => ({ ...prev, email: !isValidEmail(value) ? 'invalid' : '' }));
        break;
      case 'password':
        setErrors((prev) => ({ ...prev, password: !isValidPassword(value) }));
        break;
      case 'nickname':
        setErrors((prev) => ({ ...prev, nickname: !isValidNickname(value) ? 'invalid' : '' }));
        break;
      case 'phoneNumber':
        setErrors((prev) => ({ ...prev, phoneNumber: !isValidPhoneNumber(value) }));
        break;
      default:
        break;
    }
  };

  const handleSendVerificationCode = async () => {
    if (errors.email || !isValidEmail(user.email)) {
      setErrors((prev) => ({ ...prev, email: 'invalid' }));
      return;
    }

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 409) {
        setErrors((prev) => ({ ...prev, email: 'duplicated' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    } catch (err) {
      console.error('이메일 인증 요청 실패:', err);
    }
  };

  const handleVerifyCode = () => {
    if (code === '123456') {
      setErrors((prev) => ({ ...prev, code: false }));
      setIsCodeVerified(true);
    } else {
      setErrors((prev) => ({ ...prev, code: true }));
      setIsCodeVerified(false);
    }
  };

  const handleCheckNickname = async () => {
    setIsNicknameVerified(false);

    if (errors.nickname || !isValidNickname(user.nickname)) {
      setErrors((prev) => ({ ...prev, nickname: 'invalid' }));
      return;
    }

    try {
      const res = await fetch('/api/auth/check-nickname', {
        method: 'POST',
        body: JSON.stringify({ nickname: user.nickname }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 409) {
        setErrors((prev) => ({ ...prev, nickname: 'duplicated' }));
      } else {
        setErrors((prev) => ({ ...prev, nickname: '' }));
        setIsNicknameVerified(true);
      }
    } catch (err) {
      console.error('닉네임 확인 실패:', err);
    }
  };

  const isFormValid =
    isValidEmail(user.email) &&
    !errors.email &&
    isValidPassword(user.password) &&
    !errors.password &&
    doPasswordsMatch(user.password, user.passwordCheck) &&
    !errors.passwordCheck &&
    isValidNickname(user.nickname) &&
    !errors.nickname &&
    isValidPhoneNumber(user.phoneNumber) &&
    !errors.phoneNumber &&
    isCodeVerified;

  const handleSignup = async () => {
    if (!isFormValid) return;

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          nickname: user.nickname,
          phoneNumber: user.phoneNumber,
        }),
      });

      if (!res.ok) {
        alert('회원가입에 실패했습니다.');
        return;
      }

      alert('회원가입이 완료되었습니다!');
      // router.push('/login');
    } catch (error) {
      console.error('회원가입 요청 오류:', error);
      alert('서버 오류로 회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
      <LogoImage />
      <Title>회원가입</Title>
      <form className="mb-4 flex flex-col gap-4">
        {/* 이메일 */}
        <div>
          <Label label="이메일" htmlFor="email" />
          <div className="flex gap-2">
            <Input
              id="email"
              value={user.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="이메일을 입력해주세요."
              error={!!errors.email}
            />
            <button
              type="button"
              className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
              onClick={handleSendVerificationCode}
              disabled={errors.email === 'invalid' || !isValidEmail(user.email)}
            >
              인증번호 발송
            </button>
          </div>
          <MessageZone
            errorMessage={
              errors.email === 'invalid'
                ? errorMessages.email
                : errors.email === 'duplicated'
                  ? '이미 존재하는 계정입니다.'
                  : ''
            }
          />
        </div>

        {/* 인증번호 */}
        <div>
          <Label label="인증번호" htmlFor="code" />
          <div className="flex gap-2">
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호를 입력해주세요."
            />
            <button
              type="button"
              className="w-full rounded-md bg-blue-100 px-3 py-2"
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>
          <MessageZone
            errorMessage={errors.code ? errorMessages.code : ''}
            successMessage={isCodeVerified ? '인증이 완료되었습니다.' : ''}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <Label label="비밀번호" htmlFor="password" />
          <Input
            id="password"
            value={user.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 입력해주세요."
            className="w-full"
            type="password"
            error={errors.password}
          />
          <MessageZone errorMessage={errors.password ? errorMessages.password : ''} />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <Label label="비밀번호 확인" htmlFor="passwordCheck" />
          <Input
            id="passwordCheck"
            value={user.passwordCheck}
            onChange={handleInputChange}
            placeholder="비밀번호를 다시 입력해주세요."
            className="w-full"
            type="password"
            error={errors.passwordCheck}
          />
          <MessageZone errorMessage={errors.passwordCheck ? errorMessages.passwordCheck : ''} />
        </div>

        {/* 닉네임 */}
        <div>
          <Label label="닉네임" htmlFor="nickname" />
          <div className="flex gap-2">
            <Input
              id="nickname"
              value={user.nickname}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="닉네임을 입력해주세요."
              error={!!errors.nickname}
            />
            <button
              type="button"
              className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
              onClick={handleCheckNickname}
              disabled={errors.nickname === 'invalid' || !isValidNickname(user.nickname)}
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
        <div>
          <Label label="전화번호" htmlFor="phoneNumber" />
          <Input
            id="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="전화번호를 입력해주세요."
            className="w-full"
            error={errors.phoneNumber}
          />
          <MessageZone errorMessage={errors.phoneNumber ? errorMessages.phoneNumber : ''} />
        </div>
      </form>

      <div className="flex gap-4">
        <button className="w-full rounded-md bg-red-100 px-3 py-2">취소</button>
        <button
          className="w-full rounded-md bg-blue-100 px-3 py-2 disabled:opacity-50"
          disabled={!isFormValid}
          onClick={handleSignup}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
