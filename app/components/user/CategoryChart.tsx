'use client';
import { useState, type ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { cn } from '@/app/components/shared/root-header/lib/cn';
import { Dot } from 'lucide-react';

// import에 대한 문제점: https://nextjs.org/docs/app/building-your-application/rendering/server-components
// dynamic import로 PieChart를 클라이언트 사이드에서만 렌더링하도록 설정
const ResponsiveContainer = dynamic(
  () => import('recharts').then((comp) => comp.ResponsiveContainer),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
  }
);

/*
    중첩순서
    ResponsiceContainer -> PieChart -> Pie -> Cell

    ResponsiceContainer: 차트를 부모컨테이너에 맞추기위한 컴포넌트
    PieChart: 차트 컨테이너
    Pie: 차트
        - data: 각 객체 데이터들
        - nameKey: 각 객체 데이터의 key
        - dataKey: 각 객체 데이터의 value
        - cx/cy: 중심좌표
        - innerRadius: 차트의 내부반경
        - outerRadius: 차트의 바깥쪽 반지름
        - label: 각 객체의 데이터 value를 표시
    Cell: 각 자식에대한 조각들
*/

type IncomeCategories =
  | 'salary'
  | 'bonus'
  | 'interest'
  | 'dividend'
  | 'allowance'
  | 'sales'
  | 'other';
type ExpenseCategories =
  | 'food'
  | 'housing'
  | 'transportation'
  | 'communication'
  | 'medical'
  | 'insurance'
  | 'education'
  | 'living'
  | 'other';

export type CategoryChartProps = {
  name: string;
  price: number;
  category: IncomeCategories | ExpenseCategories;
};

export default function CategoryChart(props: { categoryList: CategoryChartProps[] }): ReactElement {
  const { categoryList } = props;

  // 급여/보너스/이자수익/배당수익/용돈/판매수입/기타
  // 식비/주거비/교통비/통신비/의료비/보험료/교육비/생활비/기타
  const categoryColors = {
    salary: '#4CAF50',
    bonus: '#81C784',
    interest: '#2196F3',
    dividend: '#64B5F6',
    allowance: '#FFB74D',
    sales: '#A1887F',
    food: '#F44336',
    housing: '#E57373',
    transportation: '#FF9800',
    communication: '#FFB74D',
    medical: '#9C27B0',
    insurance: '#BA68C8',
    education: '#3F51B5',
    living: '#64B5F6',
    other: '#9E9E9E',
  };

//   const markerColor = Object.entries(categoryColors).reduce<{ [key: string]: string }>(
//     (acc, [key, value]) => {
//       acc[key] = `bg-[${value}]`;
//       return acc;
//     },
//     {}
//   );

  return (
    <div className="flex items-center gap-4">
      <div className="size-50">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryList} // 차트에 표시할 데이터 배열을 설정
              nameKey="name"  // 각 섹터의 이름을 나타내는 키
              dataKey="price" // 각 섹터의 값을 나타내는 데이터 키
            //   startAngle={0} // 차트의 시작 각도
            //   endAngle={360} // 차트의 종료 각도
            //   cx="50%" // 차트중심의 x 좌표, 기본값: 50%
            //   cy="50%" // 차트중심의 y 좌표, 기본값: 50%
              innerRadius={"30%"} // 차트의 내부 반지름
              outerRadius={"100%"} // 차트의 외부 반지름
            //   paddingAngle={12} // 섹터간의 간격
            //   fill="#82ca9d" // 차트의 전체적인 색상
            //   label={(item) => `${item.name}: ${item.price.toLocaleString()}`} // 라벨표시 여부설정
            // labelLine={true} // 라벨과 섹터를 연결하는 선의 표시 여부
              cornerRadius={3} // 섹터의 모서리를 둥글게 만드는 반지름을 설정
            >
              {categoryList.map((item, index) => {
                return <Cell key={`cell-${index}`} fill={categoryColors[item.category]} style={{filter: "drop-shadow(0px 2px 2px gray)"}}/>;
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grow">
        {categoryList.map((item, idx) => {
            console.log(categoryColors[item.category])
          return (
            <li key={idx} className={`flex items-center gap-2 text-shadow-lg/10`}>
              <Dot size={20} strokeWidth={20} color={`${categoryColors[item.category]}`}/>
              <span className='text-black'>{item.name}</span>
              <span>{item.price}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
