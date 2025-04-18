'use client';

import { Transaction } from '@/app/shared/types/Calendar';
import { ShoppingBag } from 'lucide-react';

export default function TransactionItem({ item }: { item: Transaction }) {
  return (
    <li className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-amber-500">
          <ShoppingBag color="#f44336" /> {/*임시 아이콘*/}
        </span>
        <div>
          <p className="font-bold">{item.category}</p>
          {item.memo && <p className="text-sm text-gray-500">{item.memo}</p>}
        </div>
      </div>
      <p className={`font-semibold ${item.type === 'income' ? 'text-income' : 'text-expense'}`}>
        {item.type === 'income' ? '+' : '-'}
        {item.amount.toLocaleString()}
      </p>
    </li>
  );
}
