export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x6aB174Cb1E0EE652c2d20001f70b0c06bc975113";
export const CELO_RPC = "https://forno.celo.org";
export const MINIPAY_FEE_CURRENCY = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function shortenAddress(address: string, head = 6, tail = 4): string {
  if (!address) return "";
  return `${address.slice(0, head)}...${address.slice(-tail)}`;
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

// cfg: 1776459681190

// cfg: 1776479229241

// cfg: 1776493260121

// cfg: 1776517586148

// cfg: 1776549319440

// cfg: 1776584804282

// cfg: 1776618678857

// cfg: 1776643598936

// cfg: 1776671556002

// cfg: 1776678845957

// cfg: 1776700777452

// cfg: 1776750962954

// cfg: 1776780484387

// cfg: 1776803725616

// cfg: 1776816807759

// cfg: 1776833808895

// cfg: 1776862442501

// cfg: 1776875658462

// cfg: 1776889146603

// cfg: 1776938197892

// cfg: 1776961574705

// cfg: 1777000753446

// cfg: 1777024302949

// cfg: 1777036729875

// cfg: 1777065942648

// cfg: 1777102617648

// cfg: 1777118642922

// cfg: 1777183536791

// cfg: 1777193540082

// cfg: 1777236922332

// cfg: 1777265365755

// cfg: 1777277853966

// cfg: 1777327859152

// cfg: 1777355595682

// cfg: 1777447344034

// cfg: 1777586197514

// cfg: 1777612661197

// cfg: 1777699378039

// cfg: 1777755739529

// cfg: 1777797752842

// cfg: 1777879704258
