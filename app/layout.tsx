'use client';

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className='bg-main-bg'>
          {children}
      </body>
    </html>
  );
}
