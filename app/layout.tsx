// testing-websites/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SC Ventures',
  description: 'Fueling the next generation of innovators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. REMOVE the "dark" className from the <html> tag
    <html lang="en">
      {/* 2. ADD a background color like "bg-white" or "bg-gray-50" to the <body> tag */}
      {/* 3. Ensure the default text color is dark, e.g., "text-slate-900" */}
      <body className={`${inter.className} bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}