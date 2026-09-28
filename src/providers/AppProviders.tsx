"use client";

import { NegotiationProvider } from "@/contexts/NegotiationContext";

import { MSWProvider } from "./MSWProvider";
import { QueryProvider } from "./QueryProvider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MSWProvider>
      <QueryProvider>
        <NegotiationProvider>
          {children}
        </NegotiationProvider>
      </QueryProvider>
    </MSWProvider>
  );
}