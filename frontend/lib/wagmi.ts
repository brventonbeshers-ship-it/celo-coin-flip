import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Celo Coin Flip",
  projectId: "celo-coin-flip-minipay-app",
  chains: [celo],
  ssr: true,
});
