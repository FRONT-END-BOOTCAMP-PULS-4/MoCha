import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import CategoryChart from '@/app/components/user/ui/CategoryPieChart';
import CategoryList from '@/app/components/user/ui/CategoryList';
import PeriodBarChart from '@/app/components/user/ui/PeriodBarChart';
import { type Category, type Period } from '@/app/shared/types/Chart';
const data1: Category[] = [
  { name: '급여', price: 500000, category: 'salary' },
  { name: '투자수익', price: 500000, category: 'investment' },
  { name: '용동', price: 500000, category: 'allowance' },
  { name: '환급 & 환불', price: 500000, category: 'refund' },
  { name: '기타', price: 500000, category: 'other' },
];

const data2: Category[] = [
  { name: '식비', price: 500000, category: 'food' },
  { name: '생활', price: 500000, category: 'housing' },
  { name: '교통', price: 500000, category: 'transportation' },
  { name: '통신', price: 500000, category: 'communication' },
  { name: '의료', price: 500000, category: 'medical' },
  { name: '쇼핑', price: 500000, category: 'shopping' },
  { name: '교육', price: 500000, category: 'education' },
  { name: '문화 & 여가', price: 500000, category: 'culture' },
  { name: '경조사', price: 500000, category: 'event' },
  { name: '기타', price: 500000, category: 'other' },
];

const bardata: Period[] = [
  { name: '1월', income: 30000000, expense: 1500000 },
  { name: '2월', income: 3500000, expense: 1500000 },
  { name: '3월', income: 3200000, expense: 1500000 },
  { name: '4월', income: 2800000, expense: 1500000 },
  { name: '5월', income: 3000000, expense: 1500000 },
  { name: '6월', income: 4000000, expense: 1500000 },
];

export default function ChartTab() {
  return (
    <div className="flex grow flex-col">
      <div className="text-gray-5 flex justify-center gap-20">
        <div className="hover:text-main">
          <ArrowBigLeft />
        </div>
        <span className="text-black">11월</span>
        <div className="hover:text-main">
          <ArrowBigRight />
        </div>
      </div>

      <div className="md:flex md:gap-3">
        <div className="flex grow basis-0 flex-col items-center p-2">
          <div className="size-40">
            <CategoryChart categoryList={data1} />
          </div>
          <CategoryList categoryList={data1} />
        </div>

        <div className="flex grow basis-0 flex-col items-center p-2">
          <div className="size-40">
            <CategoryChart categoryList={data2} />
          </div>
          <CategoryList categoryList={data2} />
        </div>
      </div>

      <div className="min-h-50 grow">
        <PeriodBarChart periodList={bardata} />
      </div>
    </div>
  );
}
