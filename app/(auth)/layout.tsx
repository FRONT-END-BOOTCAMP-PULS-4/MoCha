'use client';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-main-bg m-auto max-w-(--layout-w-auth)">{children}</div>;
}
