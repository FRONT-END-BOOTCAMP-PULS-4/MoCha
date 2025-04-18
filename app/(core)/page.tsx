'use client';

import { useState } from 'react';
import FloatingButton from '../components/main/FloatingButton';
import FullCalendarWrapper from '../components/main/FullCalendarWrapper';
import Modal from '../components/main/modal/TransactionModal';
import SummaryHeader from '../components/main/SummaryHeader';
import IncomeExpenseForm from '../components/main/modal/IncomeExpenseForm';
import { DailyData } from '../shared/types/Calendar';

const mockData: { summary: { totalIncome: number; totalExpense: number }; daily: DailyData[] } = {
  summary: {
    totalIncome: 4280000,
    totalExpense: 3150000,
  },
  daily: [
    {
      date: '2025-04-15',
      income: 3500000,
      expense: 337000,
      transactions: [
        {
          id: '1',
          category: '월급',
          amount: 3500000,
          type: 'income',
        },
        {
          id: '2',
          category: '쇼핑',
          memo: '올리브영 구매',
          amount: 150000,
          type: 'expense',
        },
        {
          id: '3',
          category: '식비',
          memo: '동기들과 점심 식사',
          amount: 42000,
          type: 'expense',
        },
        {
          id: '4',
          category: '식비',
          memo: '저녁 식사',
          amount: 20000,
          type: 'expense',
        },
        {
          id: '5',
          category: '교통비',
          memo: '버스비',
          amount: 3000,
          type: 'expense',
        },
        {
          id: '6',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '7',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '8',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '9',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '10',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '11',
          category: '식비',
          memo: '간식',
          amount: 2000,
          type: 'expense',
        },
        {
          id: '12',
          category: '식비',
          memo: '간식',
          amount: 20700,
          type: 'expense',
        },
      ],
    },
  ],
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      <SummaryHeader summary={mockData.summary} />
      <FullCalendarWrapper daily={mockData.daily} />
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen}>
        <IncomeExpenseForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
