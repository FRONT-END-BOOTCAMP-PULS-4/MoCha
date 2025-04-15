import { ReactNode } from 'react';

export default function Title({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-center text-xl font-semibold">{children}</h1>
    </div>
  );
}
