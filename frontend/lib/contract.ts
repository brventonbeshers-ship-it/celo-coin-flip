import { CeloCoinFlipClient } from "celo-coin-flip-sdk";
import { CELO_RPC, CONTRACT_ADDRESS } from "./config";
export type { CoinFlipStats, LeaderboardEntry } from "celo-coin-flip-sdk";

const client = new CeloCoinFlipClient({
  contractAddress: CONTRACT_ADDRESS,
  rpcUrl: CELO_RPC,
});

export const getTotalFlips = () => client.getTotalFlips();
export const getUserStats = (address: string) => client.getUserStats(address);
export const getLeaderboard = () => client.getLeaderboard();

export const CELO_COIN_FLIP_ABI = [
  {
    inputs: [{ name: "choice", type: "uint256" }],
    name: "flip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalFlips",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "player", type: "address" }],
    name: "getUserStats",
    outputs: [
      { name: "flips", type: "uint256" },
      { name: "wins", type: "uint256" },
      { name: "latestChoice", type: "uint256" },
      { name: "latestResult", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLeaderboard",
    outputs: [
      { name: "", type: "address[10]" },
      { name: "", type: "uint256[10]" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const contractConfig = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: CELO_COIN_FLIP_ABI,
} as const;
