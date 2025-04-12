import Link from 'next/link';
import { CalendarDays, AlignJustify, AlarmClock, User, LogOut } from 'lucide-react';

export default function RootHeader() {
  return (
    <header className="h-(--header-h-base) text-base">
      <div className="bg-main-bg @container fixed h-(--header-h-base) w-full shadow-md">
        <div className="m-auto flex h-full max-w-(--layout-w-base) items-center justify-between px-4">
          {/* logo */}
          <div className="flex items-center">
            <span>Logo</span>
          </div>

          {/* button list */}
          <div className="text-gray-5">
            <div className="hover:text-main flex gap-2 @3xl:hidden">
              <AlignJustify size={20} />
            </div>
            <div className="hidden gap-4 @3xl:flex">
              <Link href="" className='hover:text-main flex gap-2'>
                <CalendarDays size={20} />
                <span>캘린더</span>
              </Link>
              <Link href="" className="hover:text-main flex gap-2">
                <AlarmClock size={20} />
                <span>챌린지</span>
              </Link>
              <Link href="" className="hover:text-main flex gap-2">
                <User size={20} />
                <span>마이페이지</span>
              </Link>
              <Link href="" className="hover:text-main flex gap-2">
                <LogOut size={20} />
                <span>로그인</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
