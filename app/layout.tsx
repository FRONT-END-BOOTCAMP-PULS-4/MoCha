'use client';

import './globals.css';

import { useAuthStore } from './shared/stores/authStore';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 앱 로드 시, 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const { setUser, setAccessToken } = useAuthStore.getState();
          setAccessToken(token); // zustand에도 다시 저장
          setUser(data.user);
        }
      })
      .catch(() => {
        localStorage.removeItem('access_token');
        useAuthStore.getState().clearAuth();
      });
  }, []);

  return (
    <html lang="ko">
      <body className="bg-main-bg">{children}</body>
    </html>
  );
}
