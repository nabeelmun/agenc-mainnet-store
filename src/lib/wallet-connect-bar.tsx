/**
 * Thin wrapper around `@solana/wallet-adapter-react-ui`'s `<WalletMultiButton>`
 * — the standard connect/disconnect + wallet-picker UI, restyled with the
 * store's own `--agenc-*` tokens via CSS variable overrides on `.wallet-adapter-*`
 * (see globals.css) so it matches the rest of the storefront instead of the
 * library's default indigo.
 */
"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletConnectBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "0.5rem 1.5rem 0",
        background: "var(--agenc-void, #0a0612)",
      }}
    >
      <WalletMultiButton />
    </div>
  );
}
