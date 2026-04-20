"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#2DD4BF",
            accentColorForeground: "#07110C",
            borderRadius: "medium",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// providers: 1776459631273

// providers: 1776479127797

// providers: 1776493154687

// providers: 1776517779705

// providers: 1776549249351

// providers: 1776584556118

// providers: 1776618528784

// providers: 1776643811432

// providers: 1776671671470

// providers: 1776678789134

// providers: 1776700698181
