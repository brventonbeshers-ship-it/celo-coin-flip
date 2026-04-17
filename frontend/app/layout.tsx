import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celo Coin Flip",
  description: "On-chain coin flip game built for Celo and MiniPay.",
  openGraph: {
    title: "Celo Coin Flip",
    description: "Flip coins on Celo, track wins, and climb the leaderboard.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
