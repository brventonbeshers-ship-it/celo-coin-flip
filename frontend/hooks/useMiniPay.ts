"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

interface MiniPayState {
  isMiniPay: boolean;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
}

let hasAttemptedMiniPayAutoConnect = false;

export function useMiniPay(): MiniPayState {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum?.isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isMiniPay || isConnected) return;
    const connector = connectors.find((item) => item.id === "injected") ?? connectors[0];
    if (!connector) return;
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.warn("MiniPay connection failed", error);
    }
  }, [connectAsync, connectors, isConnected, isMiniPay]);

  useEffect(() => {
    if (!isMiniPay || isConnected || hasAttemptedMiniPayAutoConnect) return;
    hasAttemptedMiniPayAutoConnect = true;
    void connect();
  }, [connect, isConnected, isMiniPay]);

  return { isMiniPay, address: address ?? null, isConnected, connect };
}

// minipay: 1776459735076

// minipay: 1776479241020

// minipay: 1776493146176

// minipay: 1776517581900

// minipay: 1776549133037

// minipay: 1776584812773

// minipay: 1776618670337

// minipay: 1776643617958

// minipay: 1776671726506

// minipay: 1776678826723

// minipay: 1776700709944

// minipay: 1776751071990

// minipay: 1776780368844

// minipay: 1776803775864

// minipay: 1776816860918

// minipay: 1776833765453

// minipay: 1776862498099

// minipay: 1776875754616

// minipay: 1776889169813

// minipay: 1776938302383

// minipay: 1776961512046

// minipay: 1777000619812

// minipay: 1777024101030

// minipay: 1777036553402

// minipay: 1777065859136

// minipay: 1777102806776

// minipay: 1777118797949

// minipay: 1777168536611
