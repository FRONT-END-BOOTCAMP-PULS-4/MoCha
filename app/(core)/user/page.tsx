"use client"
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import CategoryChart, {type CategoryChartProps} from '@/app/components/user/CategoryChart';

export default function Mypage() {

  const data1:CategoryChartProps[] = [
      { name: '급여', price: 100, category: "salary"},
      { name: '보너스', price: 100, category: "bonus"},
      { name: '이자수익', price: 100, category: "interest"},
      { name: '배당수익', price: 100, category: "dividend"},
      { name: '용돈', price: 100, category: "allowance"},
      { name: '판매수입', price: 100, category: "sales"},
      { name: '기타', price: 100, category: "other"},
    ];

  const data2: CategoryChartProps[] = [
      { name: '식비', price: 100, category: "food"},
      { name: '주거비', price: 100, category: "housing"},
      { name: '교통비', price: 100, category: "transportation"},
      { name: '통신비', price: 100, category: "communication"},
      { name: '의료비', price: 100, category: "medical"},
      { name: '보험료', price: 100, category: "insurance"},
      { name: '교육비', price: 100, category: "education"},
      { name: '생활비', price: 100, category: "living"},
      { name: '기타', price: 100, category: "other"},
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
        <CategoryChart categoryList={data1}/>
        <CategoryChart categoryList={data2}/>
        {/* <div>막대 그래프</div> */}
      </div>
    </main>
  );
}
