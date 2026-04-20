import { CONTRACT_ADDRESS } from "./config";

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

// abi: 1776459669624

// abi: 1776479035105

// abi: 1776493142943

// abi: 1776517828195

// abi: 1776549138422

// abi: 1776584600859

// abi: 1776618512735

// abi: 1776643824189
