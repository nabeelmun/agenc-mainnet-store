/**
 * Shared RPC endpoint resolution — used by both the AgenC read/write client
 * (`providers.tsx`) and the wallet-adapter connection (`wallet-connection.tsx`)
 * so they always point at the same cluster.
 */
import { storeConfig } from "./config";

const RPC_HOST_PATTERN =
  /solana\.com|helius|rpcpool|quiknode|quicknode|alchemy|ankr|triton|syndica/i;

/**
 * Resolve the gPA/write RPC URL. `NEXT_PUBLIC_AGENC_RPC_URL` wins when set —
 * the per-network public defaults commonly reject browser JSON-RPC on
 * mainnet, so real deployments should provide their own endpoint.
 */
export function rpcEndpoint(): string {
  const override = process.env.NEXT_PUBLIC_AGENC_RPC_URL;
  if (override) return override;
  const base = storeConfig.api.baseUrl;
  const isLocalRpc = base.includes("127.0.0.1") || base.includes("localhost");
  if (isLocalRpc) return base;
  if (RPC_HOST_PATTERN.test(base)) return base;
  switch (storeConfig.network) {
    case "localnet":
      return "http://127.0.0.1:8899";
    case "devnet":
      return "https://api.devnet.solana.com";
    case "mainnet":
      return "https://api.mainnet-beta.solana.com";
  }
}

/** Is `api.baseUrl` a real indexer (vs a local or hosted bare RPC)? */
export function indexerBaseUrl(): string | null {
  const base = storeConfig.api.baseUrl;
  if (base.includes("127.0.0.1") || base.includes("localhost")) return null;
  if (RPC_HOST_PATTERN.test(base)) return null;
  return base;
}
