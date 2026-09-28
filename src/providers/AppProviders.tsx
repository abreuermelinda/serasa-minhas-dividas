"use client";

import { MSWProvider } from "./MSWProvider";
import { QueryProvider } from "./QueryProvider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MSWProvider>
      <QueryProvider>{children}</QueryProvider>
    </MSWProvider>
  );
}