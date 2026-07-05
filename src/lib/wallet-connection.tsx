/**
 * `<SolanaWalletProviders>` — wraps the app in the standard
 * `@solana/wallet-adapter-react` context (Wallet Standard auto-detection: an
 * empty `wallets` array still picks up any installed Wallet Standard wallet —
 * Phantom, Solflare, Backpack, etc. — with no per-wallet package needed).
 *
 * This sits OUTSIDE `<Providers>` (the AgenC context) so `useWallet()` is
 * available when `<Providers>` builds the AgenC signer from the connected
 * adapter via `@tetsuo-ai/marketplace-react`'s `signerFromWalletAdapter`.
 */
"use client";
import { useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { rpcEndpoint } from "./rpc";

export function SolanaWalletProviders({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => rpcEndpoint(), []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
