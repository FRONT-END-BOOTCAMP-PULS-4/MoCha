'use client';

import Image from 'next/image';
import Input from '@/app/components/shared/input/Input';
import Label from '@/app/components/shared/label/Label';

export default function page() {
  return (
    <div>
      {/* 로고 */}
      <div className="flex justify-center">
        <Image src="/images/mocha_logo.svg" alt="Mocha_logo" width={120} height={30} />
      </div>
      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-center text-xl font-semibold">로그인</h1>
      </div>
      {/* 로그인 폼 */}
      <form className="mb-4 flex flex-col gap-4">
        {/* 이메일 */}
        <div>
          <Label label="이메일" htmlFor="email" />
          <div className="flex gap-2">
            <Input placeholder="이메일을 입력해주세요." id="email" className="w-full" />
          </div>
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
        </div>
      </form>
      {/* 로그인 버튼 */}
      <div className="mb-4">
        <button className="w-full rounded-md bg-blue-100 px-3 py-2">로그인</button>
      </div>
      {/* 회원가입, 아이디 찾기, 비밀번호 찾기 */}
      <div className="flex justify-center gap-4 text-sm">
        <button className="hover:cursor-pointer">회원가입</button>
        <span>|</span>
        <button className="hover:cursor-pointer">아이디 찾기</button>
        <span>|</span>
        <button className="hover:cursor-pointer">비밀번호 찾기</button>
      </div>
      {/* 간편 로그인 */}
      <div>
        <div className="my-6 flex items-center">
          <div className="border-gray-2 flex-grow border-t" />
          <span className="text-gray-6 mx-4 text-sm">간편 로그인</span>
          <div className="border-gray-2 flex-grow border-t" />
        </div>

        <div className="mt-2 flex flex-col justify-center gap-4">
          <button className="border-gray-3 flex justify-center gap-2 rounded-md border bg-white px-4 py-3">
            <Image
              src="/images/social/google-logo.svg"
              alt="구글 로그인 아이콘"
              width={20}
              height={20}
            />
            <div>구글로 로그인하기</div>
          </button>
          <button className="flex justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-3">
            <Image
              src="/images/social/kakao-logo.svg"
              alt="카카오 로그인 아이콘"
              width={20}
              height={20}
            />
            <div>카카오톡으로 로그인하기</div>
          </button>
        </div>
      </div>
    </div>
  );
}
