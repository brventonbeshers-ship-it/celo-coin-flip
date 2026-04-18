import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Celo Coin Flip",
  projectId: "celo-coin-flip-minipay-app",
  chains: [celo],
  ssr: true,
});

// wagmi: 1776459728704

// wagmi: 1776479191005

// wagmi: 1776493201274
