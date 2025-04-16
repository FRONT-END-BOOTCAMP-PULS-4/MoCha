'use client';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-main-bg m-auto my-12.5 max-w-(--layout-w-auth)">{children}</div>;
}
