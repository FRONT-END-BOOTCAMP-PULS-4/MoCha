'use client';

import { DailyDetailModalProps } from '@/app/shared/types/Calendar';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import SummaryHeader from '../SummaryHeader';
import TransactionItem from './TransactionItem';

export default function DailyDetailModal({
  date,
  income,
  expense,
  transactions,
  onClose,
}: DailyDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="h-screen w-full max-w-md overflow-hidden bg-white px-2 md:h-3/4">
        <div className="border-b-gray-3 flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold">{date}</h2>
          <button onClick={onClose}>
            <X className="text-gray-6" />
          </button>
        </div>

        <div className="border-b-gray-3 border-b px-10 text-sm font-semibold">
          <SummaryHeader summary={{ totalIncome: income, totalExpense: expense }} />
        </div>

        <ul className="divide-gray-3 max-h-screen divide-y overflow-y-auto">
          {transactions.map((item) => (
            <TransactionItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
