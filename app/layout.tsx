import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '담소 - 어르신을 위한 AI 친구',
  description: '어르신들의 이야기를 들어주고 건강을 체크하는 따뜻한 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
