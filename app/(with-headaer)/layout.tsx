'use client';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="h-12.5">헤더입니다</header>
      <div>{children}</div>
    </div>
  );
}
