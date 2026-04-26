"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMiniPay } from "@/hooks/useMiniPay";

export default function Header() {
  const { isMiniPay, isConnected, connect } = useMiniPay();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-normal text-white">Celo Coin Flip</h1>
          <p className="text-sm text-slate-400">Choose a side, flip on-chain.</p>
        </div>
        {isMiniPay ? (
          !isConnected && (
            <button
              type="button"
              onClick={() => void connect()}
              className="rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Connect MiniPay
            </button>
          )
        ) : (
          <ConnectButton />
        )}
      </div>
    </header>
  );
}

// header: 1776459574866

// header: 1776479234507

// header: 1776493205523

// header: 1776517725443

// header: 1776549192575

// header: 1776584613598

// header: 1776618718211

// header: 1776643866238

// header: 1776671680214

// header: 1776678842700

// header: 1776700838909

// header: 1776751173319

// header: 1776780309287

// header: 1776803731117

// header: 1776816914568

// header: 1776833713676

// header: 1776862423467

// header: 1776875749368

// header: 1776888969591

// header: 1776938147284

// header: 1776961698409

// header: 1777000663140

// header: 1777024215321

// header: 1777036690653

// header: 1777065812171

// header: 1777102605639

// header: 1777118791438

// header: 1777183503319

// header: 1777193730814

// header: 1777214140753
