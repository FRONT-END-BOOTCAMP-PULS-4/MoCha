'use client';
import Header from '@/app/shared/ui/root-header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="m-auto max-w-(--layout-w-base)">{children}</div>
    </div>
  );
}
