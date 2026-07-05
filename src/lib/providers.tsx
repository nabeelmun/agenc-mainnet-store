/**
 * `<Providers>` — the client boundary that mounts `<AgencProvider>` above the
 * whole app. It wires reads (indexer-first + gPA fallback), the referrer config
 * (validated + stored + disclosed + INJECTED into every hire at the provider
 * level — referral settlement is live on-chain), the network, AND the write
 * signer bridged from the connected `@solana/wallet-adapter-react` wallet.
 *
 * ## Read transport
 *
 * `AgencProvider` derives its read transport from `config.indexer` or
 * `config.queryTransport` only — it does NOT (v1) build a kit RPC from a bare
 * `rpcUrl`. So for the gPA / localnet path we construct the read transport here
 * with `createReadTransport({ rpc })` and pass it as `queryTransport`. When
 * `api.baseUrl` is a real hosted indexer we pass `indexer` and let the provider
 * resolve indexer-first.
 *
 * ## Signer
 *
 * `<SolanaWalletProviders>` (mounted in the root layout, outside this
 * component) provides the standard `@solana/wallet-adapter-react` context.
 * Once a wallet is connected, `signerFromWalletAdapter` (shipped by
 * `@tetsuo-ai/marketplace-react`) bridges it into the kit `TransactionSigner`
 * the SDK's write client consumes — no custom transaction-signing code here,
 * just the official adapter bridge. Until a wallet connects, `signer` is
 * `undefined` and hire/review/activation buttons show the "connect a wallet"
 * hint (the package's own gating, unchanged).
 */
"use client";
import { useMemo, type ReactNode } from "react";
import {
  AgencProvider,
  createReadTransport,
  signerFromWalletAdapter,
  type AgencProviderConfig,
  type WalletAdapterLike,
} from "@tetsuo-ai/marketplace-react";
import { createSolanaRpc } from "@solana/kit";
import { VersionedTransaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import "@tetsuo-ai/marketplace-react/theme.css";
import "@tetsuo-ai/marketplace-react/components.css";
import { storeConfig } from "./config";
import { rpcEndpoint, indexerBaseUrl } from "./rpc";

export function Providers({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  const { connected, publicKey, signTransaction } = wallet;

  const signer = useMemo(() => {
    if (!connected || !publicKey || !signTransaction) return undefined;
    // `wallet-adapter-react`'s `signTransaction` is generically typed over
    // web3.js's `Transaction | VersionedTransaction`; the package's
    // `WalletAdapterLike` is a narrower structural type over just
    // `VersionedTransactionLike`. Both accept the same runtime shape
    // (`signerFromWalletAdapter` only ever calls it with a VersionedTransaction),
    // so this is a type-only narrowing, not a behavior change.
    const adapter: WalletAdapterLike = {
      publicKey,
      signTransaction: signTransaction as WalletAdapterLike["signTransaction"],
    };
    return signerFromWalletAdapter(adapter, { VersionedTransaction });
  }, [connected, publicKey, signTransaction]);

  const config = useMemo<AgencProviderConfig>(() => {
    const indexer = indexerBaseUrl();
    // Referrer: validated + stored + disclosed + injected into every hire by
    // the provider (referral settlement is live on-chain). Earnings are read
    // from chain, never faked.
    const referrer = {
      wallet: storeConfig.referrer.wallet,
      feeBps: storeConfig.referrer.feeBps,
    };
    if (indexer) {
      return {
        network: storeConfig.network,
        // The WRITE client (and single-account reads like the WP-A1
        // roster-attestor resolution) builds from rpcUrl — pass the working
        // endpoint explicitly instead of the per-network default.
        rpcUrl: rpcEndpoint(),
        indexer: { baseUrl: indexer, apiKey: storeConfig.api.apiKey },
        referrer,
        signer,
      };
    }
    // gPA / localnet: build the read transport explicitly and pass it through
    // the `queryTransport` seam.
    return {
      network: storeConfig.network,
      rpcUrl: rpcEndpoint(),
      queryTransport: createReadTransport({ rpc: createSolanaRpc(rpcEndpoint()) }),
      referrer,
      signer,
    };
  }, [signer]);

  return <AgencProvider config={config}>{children}</AgencProvider>;
}
