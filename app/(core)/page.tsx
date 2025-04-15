'use client';

import FloatingButton from '../components/main/FloatingButton';
import FullCalendarWrapper from '../components/main/FullCalendarWrapper';
import SummaryHeader from '../components/main/SummaryHeader';

const mockData = {
  summary: {
    totalIncome: 4280000,
    totalExpense: 3150000,
  },
  daily: [
    { date: '2025-04-01', income: 120000, expense: 45000 },
    { date: '2025-04-02', income: 350000, expense: 180000 },
    { date: '2025-04-04', income: 0, expense: 23000 },
    { date: '2025-04-07', income: 450000, expense: 0 },
    { date: '2025-04-11', income: 0, expense: 13000 },
    { date: '2025-04-14', income: 200000, expense: 90000 },
  ],
};

export default function Home() {
  return (
    <div className="">
      <SummaryHeader summary={mockData.summary} />
      <FullCalendarWrapper daily={mockData.daily} />
      <FloatingButton onClick={() => alert('내역 추가 버튼 클릭됨!')} />
    </div>
  );
}
