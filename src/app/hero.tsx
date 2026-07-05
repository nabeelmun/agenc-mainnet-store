/**
 * Landing hero for the catalog page — pure layout/copy (no protocol logic).
 * Styled after agenc.ag's own landing page: the same `Audiowide` display font,
 * the same `--agenc-cool-from`/`--agenc-cool-to` gradient heading, and the
 * real AgenC wordmark/icon (fetched from agenc.ag) as a "Built on AgenC"
 * attribution badge — this store's own name stays the nav wordmark, this is
 * just crediting the protocol it's built on.
 */
import Image from "next/image";
import { audiowide } from "@/lib/fonts";

export function Hero({ liveListingCount }: { liveListingCount: number }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "3rem 0 2rem",
        borderBottom: "1px solid var(--agenc-border, #2e1a4a)",
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(60rem 20rem at 10% -20%, rgba(123, 63, 255, 0.25), transparent 60%), radial-gradient(40rem 16rem at 90% 0%, rgba(72, 200, 239, 0.15), transparent 60%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid var(--agenc-border-strong, #4a2e7a)",
            background: "var(--agenc-surface, #16102a)",
            fontSize: "0.75rem",
            color: "var(--agenc-text-muted, #b8a8d9)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: "0.45rem",
              height: "0.45rem",
              borderRadius: "50%",
              background: "var(--agenc-success, #3fffa0)",
              display: "inline-block",
            }}
          />
          Live on Solana mainnet
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.25rem 0.75rem 0.25rem 0.5rem",
            borderRadius: "999px",
            border: "1px solid var(--agenc-border-strong, #4a2e7a)",
            background: "var(--agenc-surface, #16102a)",
            fontSize: "0.75rem",
            color: "var(--agenc-text-muted, #b8a8d9)",
          }}
        >
          <Image
            src="/agenc-icon.png"
            alt=""
            width={16}
            height={16}
            style={{ borderRadius: "4px" }}
          />
          Built on AgenC
        </span>
      </div>

      <h1
        className={audiowide.className}
        style={{
          margin: 0,
          fontSize: "clamp(1.7rem, 4.2vw, 2.9rem)",
          lineHeight: 1.15,
          fontWeight: 400,
          background:
            "linear-gradient(90deg, var(--agenc-cool-from, #48c8ef), var(--agenc-cool-to, #7b3fff))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Agents for hire.
        <br />
        Settled on-chain.
      </h1>

      <p
        style={{
          marginTop: "1rem",
          maxWidth: "38rem",
          color: "var(--agenc-text-muted, #b8a8d9)",
          fontSize: "1.02rem",
          lineHeight: 1.55,
        }}
      >
        Browse live AgenC listings, hire a vetted agent, and let program-owned
        escrow and on-chain settlement handle the rest — every payout lands as
        an on-chain receipt.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginTop: "1.5rem",
          alignItems: "center",
        }}
      >
        <a
          href="#catalog"
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "999px",
            background: "var(--agenc-violet, #7b3fff)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          Browse listings →
        </a>
        <a
          href="/trust"
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "999px",
            border: "1px solid var(--agenc-border-strong, #4a2e7a)",
            color: "var(--agenc-text, #f5f0ff)",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          How it works
        </a>

        <span
          style={{
            marginLeft: "0.25rem",
            fontSize: "0.85rem",
            color: "var(--agenc-text-dim, #6e5c8f)",
            fontFamily:
              "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
          }}
        >
          {liveListingCount} live listing{liveListingCount === 1 ? "" : "s"} on
          this store right now
        </span>
      </div>
    </section>
  );
}
