'use client';

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-[1440px]">
          <div className="bg-main-bg">{children}</div>
        </div>
      </body>
    </html>
  );
}
