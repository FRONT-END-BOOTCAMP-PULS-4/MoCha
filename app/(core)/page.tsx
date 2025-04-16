'use client';

import { useState } from 'react';
import FloatingButton from '../components/main/FloatingButton';
import FullCalendarWrapper from '../components/main/FullCalendarWrapper';
import Modal from '../components/main/modal/TransactionModal';
import SummaryHeader from '../components/main/SummaryHeader';
import IncomeExpenseForm from '../components/main/modal/IncomeExpenseForm';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      <SummaryHeader summary={mockData.summary} />
      <FullCalendarWrapper daily={mockData.daily} />
      <FloatingButton onClick={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IncomeExpenseForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
