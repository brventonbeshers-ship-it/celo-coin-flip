import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080A12",
        panel: "#111827",
        line: "rgba(255,255,255,0.12)",
        aqua: "#2DD4BF",
        sun: "#F7C948",
        coral: "#FF6B6B",
        berry: "#C084FC",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.28)",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        flip: "flip 0.65s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

// tw: 1776459433483

// tw: 1776479180473

// tw: 1776493190782

// tw: 1776517764707

// tw: 1776549310405

// tw: 1776584550877

// tw: 1776618684373

// tw: 1776643761746

// tw: 1776671722259

// tw: 1776678735136

// tw: 1776700816462

// tw: 1776751158517

// tw: 1776780428096

// tw: 1776803978168

// tw: 1776816904801

// tw: 1776833801142

// tw: 1776862418212

// tw: 1776875867025

// tw: 1776889112957

// tw: 1776938200133

// tw: 1776961628023

// tw: 1777000796733

// tw: 1777024257675

// tw: 1777036666382

// tw: 1777065988157
