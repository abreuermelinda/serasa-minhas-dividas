import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NegotiationProvider } from "@/contexts/NegotiationContext";

import Home from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <NegotiationProvider>
        <Home />
      </NegotiationProvider>
    </QueryClientProvider>,
  );
}

describe("Offers page", () => {
  it("displays the offers returned by the API", async () => {
    renderPage();

    expect(await screen.findByText("Banco Horizonte")).toBeInTheDocument();

    expect(screen.getByText("Conecta Telecom")).toBeInTheDocument();

    expect(screen.getByText("Loja Vitrine")).toBeInTheDocument();
  });
});
