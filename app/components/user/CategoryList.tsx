'use client';
import { type ReactElement } from 'react';
import { Dot } from 'lucide-react'
import { type CategoryListProps} from './types';

export default function CategoryList(props: CategoryListProps): ReactElement {
    const { categoryList, className = 'text-black' } = props;
  return (
    <ul className="p-2 max-w-150 flex justify-center flex-wrap">
      {categoryList.map((item, idx) => {
        return (
          <li key={idx} className={`flex items-center gap-1 text-shadow-lg/5`}>
            <Dot size={15} strokeWidth={15} color={`var(--category-${item.category})`} />
            <span className="text-gray-6">{item.name}</span>
            <span className={className}>{item.price.toLocaleString()}</span>
          </li>
        );
      })}
    </ul>
  );
}
