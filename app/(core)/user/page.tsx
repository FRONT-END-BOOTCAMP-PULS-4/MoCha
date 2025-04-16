'use client';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import CategoryChart from '@/app/components/user/CategoryChart';
import CategoryList from '@/app/components/user/CategoryList';
import { type Category } from '@/app/types/Category';

export default function Mypage() {
  const data1: Category[] = [
    { name: '급여', price: 3000000, category: 'salary' },
    { name: '보너스', price: 500000, category: 'bonus' },
    { name: '이자수익', price: 3000000, category: 'interest' },
    { name: '배당수익', price: 1500000, category: 'dividend' },
    { name: '용돈', price: 200000, category: 'allowance' },
    { name: '판매수입', price: 50000, category: 'sales' },
    { name: '기타', price: 210000, category: 'other' },
  ];

  const data2: Category[] = [
    { name: '식비', price: 40000, category: 'food' },
    { name: '주거비', price: 500000, category: 'housing' },
    { name: '교통비', price: 20000, category: 'transportation' },
    { name: '통신비', price: 50000, category: 'communication' },
    { name: '의료비', price: 200000, category: 'medical' },
    { name: '보험료', price: 70000, category: 'insurance' },
    { name: '교육비', price: 400000, category: 'education' },
    { name: '생활비', price: 1000000, category: 'living' },
    { name: '기타', price: 50000, category: 'other' },
  ];

  return (
    <main className="flex flex-col gap-4 p-4 text-base">
      <div className="text-gray-5 border-gray-4 flex gap-3 border-b pb-3">
        <button className="hover:text-main hover:border-main rounded-2xl border px-2 py-1">
          통계차트
        </button>
        <button className="hover:text-main hover:border-main rounded-2xl border px-2 py-1">
          프로필설정
        </button>
      </div>
      <div>
        {/* 버튼리스트: 교체예정 */}
        <div className="text-gray-5 flex justify-center gap-20">
          <div className="hover:text-main">
            <ArrowBigLeft />
          </div>
          <span className="text-black">11월</span>
          <div className="hover:text-main">
            <ArrowBigRight />
          </div>
        </div>

        <div className='md:flex md:gap-3'>

          <div className="grow basis-0 flex flex-col items-center">
            <div className="size-40">
              <CategoryChart categoryList={data1} />
            </div>
            <CategoryList categoryList={data1} />
          </div>

          <div className="grow basis-0 flex flex-col items-center">
            <div className="size-40">
              <CategoryChart categoryList={data2} />
            </div>
            <CategoryList categoryList={data2} />
          </div>
        </div>
      </div>
    </main>
  );
}
