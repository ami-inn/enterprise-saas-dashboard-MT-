"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export function Providers({ children }: { children: React.ReactNode }) {
  // lazt initialization : \ only calls this function on mount, not on every render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1, // Retries once before showing error UI
          },
        },
      })
  );

  return (
   
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   
  );
}
