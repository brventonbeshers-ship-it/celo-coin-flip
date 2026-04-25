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
      <head>
        <meta
          name="talentapp:project_verification"
          content="5d315c6ac3a6911f0780470a9fb1032af870962a78b5be8a8cd8269e8de809ff1370a99ed85b1792444f670b6d118dcbc99790c6c4b65c073e7dd930f2f11fe0"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// layout: 1776459544141

// layout: 1776479084401

// layout: 1776493247068

// layout: 1776517593659

// layout: 1776549155520

// layout: 1776584761808

// layout: 1776618574364

// layout: 1776643818945

// layout: 1776671673714

// layout: 1776678682215

// layout: 1776700834667

// layout: 1776751014744

// layout: 1776780322301

// layout: 1776803983654

// layout: 1776816734671

// layout: 1776833647082

// layout: 1776862351892

// layout: 1776875616525

// layout: 1776889042676

// layout: 1776938152543

// layout: 1776961631277

// layout: 1777000667388

// layout: 1777024307188

// layout: 1777036626690

// layout: 1777065848359

// layout: 1777102736290
