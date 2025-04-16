import { type ReactElement } from 'react';
import Link from 'next/link';
import { CalendarDays, AlarmClock, User, LogOut } from 'lucide-react';

export default function ButtonList(): ReactElement {
  return (
    <>
      <Link href="" className="hover:text-main flex gap-2">
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
    </>
  );
}
