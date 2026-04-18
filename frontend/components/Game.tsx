"use client";

import { useEffect, useMemo, useState } from "react";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { celo } from "viem/chains";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { useMiniPay } from "@/hooks/useMiniPay";
import { contractConfig } from "@/lib/contract";
import {
  CELO_RPC,
  ZERO_ADDRESS,
  formatNumber,
  shortenAddress,
} from "@/lib/config";
import { sendMiniPayTransaction } from "@/lib/minipayTx";

const publicClient = createPublicClient({ chain: celo, transport: http(CELO_RPC) });

interface CoinStats {
  flips: number;
  wins: number;
  lastChoice: number;
  lastResult: number;
}

interface LeaderboardRow {
  address: string;
  score: number;
}

export default function Game() {
  const { address, isConnected } = useAccount();
  const { isMiniPay } = useMiniPay();
  const [choice, setChoice] = useState(0);
  const [totalFlips, setTotalFlips] = useState(0);
  const [stats, setStats] = useState<CoinStats>({ flips: 0, wins: 0, lastChoice: 0, lastResult: 0 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [miniPayHash, setMiniPayHash] = useState<`0x${string}`>();

  const { sendTransactionAsync, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: miniPayHash ?? hash });

  const busy = isPending || isConfirming;
  const winRate = stats.flips === 0 ? 0 : Math.round((stats.wins / stats.flips) * 100);
  const lastOutcome = useMemo(() => {
    if (!stats.flips) return "No flip yet";
    return stats.lastChoice === stats.lastResult ? "Win" : "Miss";
  }, [stats.flips, stats.lastChoice, stats.lastResult]);

  useEffect(() => {
    void loadStats();
  }, [address]);

  useEffect(() => {
    if (isSuccess) void loadStats();
  }, [isSuccess]);

  async function loadStats() {
    try {
      setLoadError(false);

      const total = (await publicClient.readContract({
        ...contractConfig,
        functionName: "totalFlips",
      })) as bigint;
      setTotalFlips(Number(total));

      if (address) {
        const [flips, wins, lastChoice, lastResult] = (await publicClient.readContract({
          ...contractConfig,
          functionName: "getUserStats",
          args: [address],
        })) as readonly [bigint, bigint, bigint, bigint];

        setStats({
          flips: Number(flips),
          wins: Number(wins),
          lastChoice: Number(lastChoice),
          lastResult: Number(lastResult),
        });
      }

      const [addresses, scores] = (await publicClient.readContract({
        ...contractConfig,
        functionName: "getLeaderboard",
      })) as readonly [readonly string[], readonly bigint[]];

      const rows: LeaderboardRow[] = [];
      for (let i = 0; i < 10; i++) {
        const rowAddress = addresses[i];
        const score = Number(scores[i]);
        if (rowAddress && rowAddress !== ZERO_ADDRESS && score > 0) {
          rows.push({ address: rowAddress, score });
        }
      }
      setLeaderboard(rows);
    } catch {
      setLoadError(true);
    }
  }

  async function handleFlip() {
    if (!isConnected || !address || busy) return;

    setTxError(null);
    setMiniPayHash(undefined);
    try {
      const data = encodeFunctionData({
        abi: contractConfig.abi,
        functionName: "flip",
        args: [BigInt(choice)],
      });

      if (isMiniPay) {
        const nextHash = await sendMiniPayTransaction(contractConfig.address, data);
        setMiniPayHash(nextHash);
      } else {
        await sendTransactionAsync({
          account: address,
          to: contractConfig.address,
          data,
        } as Parameters<typeof sendTransactionAsync>[0]);
      }
    } catch (error) {
      setTxError(error instanceof Error ? error.message.slice(0, 180) : "Transaction rejected or failed.");
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="panel p-5 md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase text-aqua">On-chain game</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-normal text-white">Flip the coin</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-right sm:grid-cols-3">
              <Stat label="Total flips" value={formatNumber(totalFlips)} />
              <Stat label="Your wins" value={formatNumber(stats.wins)} />
              <Stat label="Win rate" value={`${winRate}%`} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
            <div className="flex items-center justify-center rounded-lg border border-line bg-ink/60 p-6">
              <CoinFace side={stats.flips ? stats.lastResult : choice} spinning={busy} />
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Your side</span>
                  <span className="rounded-md border border-line px-2 py-1 text-sm text-sun">
                    {sideName(choice)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1].map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setChoice(side)}
                      className={`h-14 rounded-md border text-base font-semibold transition ${
                        choice === side
                          ? "border-aqua bg-aqua text-ink"
                          : "border-line bg-white/5 text-white hover:border-aqua"
                      }`}
                    >
                      {sideName(side)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Result label="Last choice" value={stats.flips ? sideName(stats.lastChoice) : "-"} />
                <Result label="Last result" value={stats.flips ? sideName(stats.lastResult) : "-"} />
                <Result label="Outcome" value={lastOutcome} accent={lastOutcome === "Win"} />
              </div>

              <button
                type="button"
                onClick={handleFlip}
                disabled={!isConnected || busy}
                className="h-14 rounded-lg bg-aqua px-5 text-base font-semibold text-ink transition hover:bg-[#5FE3D4] disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              >
                {busy ? "Confirming..." : isConnected ? "Flip on Celo" : "Connect wallet"}
              </button>
              {loadError && (
                <p className="text-sm text-coral">Contract data will load after deployment address is set.</p>
              )}
              {txError && <p className="text-sm text-coral">{txError}</p>}
            </div>
          </div>
        </div>
      </div>

      <aside className="panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
          <span className="text-sm text-slate-400">Wins</span>
        </div>
        <div className="space-y-2">
          {leaderboard.length === 0 ? (
            <p className="rounded-md border border-line bg-white/5 px-3 py-4 text-sm text-slate-400">
              No winning flips yet.
            </p>
          ) : (
            leaderboard.map((row, index) => (
              <div
                key={row.address}
                className="flex items-center justify-between rounded-md border border-line bg-white/5 px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-sm font-semibold text-slate-500">#{index + 1}</span>
                  <span className="text-sm text-white">
                    {row.address === address ? "You" : shortenAddress(row.address)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-sun">{formatNumber(row.score)}</span>
              </div>
            ))
          )}
        </div>
      </aside>
    </section>
  );
}

function sideName(side: number) {
  return side === 0 ? "Heads" : "Tails";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-white/5 px-3 py-2">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function Result({ label, value, accent = false }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="rounded-md border border-line bg-ink/60 px-3 py-3">
      <div className={`text-lg font-semibold ${accent ? "text-aqua" : "text-white"}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function CoinFace({ side, spinning }: { side: number; spinning: boolean }) {
  return (
    <div
      className={`flex h-40 w-40 items-center justify-center rounded-full border-8 border-sun bg-gradient-to-br from-sun via-white to-aqua text-3xl font-black text-ink shadow-soft ${
        spinning ? "animate-flip" : ""
      }`}
      aria-label={`Coin ${sideName(side)}`}
    >
      {side === 0 ? "H" : "T"}
    </div>
  );
}

// game: 1776459731887

// game: 1776479225976

// game: 1776493072086

// game: 1776517736196

// game: 1776549269560
