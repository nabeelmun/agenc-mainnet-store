/**
 * `<SolanaWalletProviders>` — wraps the app in the standard
 * `@solana/wallet-adapter-react` context.
 *
 * `wallets` lists a curated set of well-known Solana wallets EXPLICITLY (not
 * just Wallet Standard auto-detection), so the connect modal always shows
 * named options — Phantom, Solflare, Backpack, Coinbase, Trust, Ledger — even
 * for a visitor who hasn't installed anything yet; clicking an uninstalled
 * one links out to its install page. `@solana/wallet-adapter-react`
 * de-duplicates against Wallet Standard's own auto-detected entry when a
 * listed wallet IS installed, so there's no double row.
 *
 * Note: MetaMask is deliberately not offered here — it's an Ethereum-only
 * wallet with no Solana signing support, so it could never actually connect
 * to this (Solana) marketplace.
 *
 * This sits OUTSIDE `<Providers>` (the AgenC context) so `useWallet()` is
 * available when `<Providers>` builds the AgenC signer from the connected
 * adapter via `@tetsuo-ai/marketplace-react`'s `signerFromWalletAdapter`.
 */
"use client";
import { useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { TrustWalletAdapter } from "@solana/wallet-adapter-trust";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import "@solana/wallet-adapter-react-ui/styles.css";
import { rpcEndpoint } from "./rpc";

export function SolanaWalletProviders({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => rpcEndpoint(), []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [],
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
