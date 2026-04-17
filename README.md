# Celo Coin Flip

On-chain coin flip game for Celo and MiniPay. Players choose heads or tails, submit the flip on Celo, and track personal and global results.

Contract: `0x6aB174Cb1E0EE652c2d20001f70b0c06bc975113`
CeloScan: https://celoscan.io/address/0x6aB174Cb1E0EE652c2d20001f70b0c06bc975113#code

## Project Structure

- `contracts/` - Solidity contract deployed to Celo mainnet
- `frontend/` - Next.js MiniApp frontend with MiniPay support
- `sdk/` - TypeScript SDK used by the frontend
- `scripts/` - Hardhat deployment script

## Commands

```bash
npm install
npm run compile
npm run deploy
```

```bash
cd sdk
npm install
npm run build
```

```bash
cd frontend
npm install
npm run build
```
