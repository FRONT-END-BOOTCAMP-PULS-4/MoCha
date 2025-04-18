import Profile from '@/app/components/user/ui/Profile';

export default function ProfileTab() {
  return (
    <div>
      {/* 프로필 */}
      <Profile/>
      <div className="flex flex-col gap-3 py-4 text-sm">
        <button className="border-gray-5 text-gray-5 hover:text-main hover:border-main cursor-pointer rounded-lg border p-1">
          비밀번호 변경
        </button>
        <button className="border-gray-5 text-gray-5 hover:text-main hover:border-main cursor-pointer rounded-lg border p-1">
          회원탈퇴
        </button>
      </div>
      <hr className="text-gray-4 my-3" />
      <h2 className="text-gray-5 text-3xl">챌린지 목록</h2>
      <ul className="flex flex-col gap-5 py-2">
        <li className="bg-main text-gray-1 rounded-2xl p-3 shadow-lg">
          <p className="p-2 text-lg">무지출 챌린지</p>
          <div className="flex items-center justify-end gap-3">
            <span>2025 - 04</span>
            <button className="border-error text-error rounded-2xl border bg-white px-2 py-1">
              포기
            </button>
          </div>
        </li>
        <li className="bg-gray-5 text-gray-1 rounded-2xl p-3 shadow-lg">
          <p className="p-2 text-lg">3월 80만원 챌린지</p>
          <div className="flex items-center justify-end gap-3">
            <span>2025 - 04</span>
            <button className="border-gray-5 text-gray-5 rounded-2xl border bg-white px-2 py-1">
              성공
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
