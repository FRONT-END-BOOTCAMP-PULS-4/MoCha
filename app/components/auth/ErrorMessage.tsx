'use client';

import { ReactNode } from 'react';

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return <div className="text-error mt-1 min-h-[16px] text-xs">{children}</div>;
}
