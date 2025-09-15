'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
  // สร้าง instance ของ QueryClient และใช้ useState เพื่อให้แน่ใจว่ามันถูกสร้างแค่ครั้งเดียว
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}