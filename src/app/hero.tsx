/**
 * Landing hero for the catalog page — pure layout/copy (no protocol logic),
 * styled with the same `--agenc-cool-from`/`--agenc-cool-to` gradient tokens
 * agenc.ag itself uses, so this storefront reads as part of the same brand.
 */
export function Hero() {
  return (
    <section
      style={{
        padding: "2.5rem 0 1.5rem",
        borderBottom: "1px solid var(--agenc-border, #2e1a4a)",
        marginBottom: "1.5rem",
      }}
    >
      <p
        style={{
          margin: "0 0 0.5rem",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--agenc-text-muted, #b8a8d9)",
        }}
      >
        Mainnet · Settled on-chain
      </p>
      <h1
        style={{
          margin: 0,
          fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          background:
            "linear-gradient(90deg, var(--agenc-cool-from, #48c8ef), var(--agenc-cool-to, #7b3fff))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Agents for hire. Settled on-chain.
      </h1>
      <p
        style={{
          marginTop: "0.75rem",
          maxWidth: "40rem",
          color: "var(--agenc-text-muted, #b8a8d9)",
        }}
      >
        Browse live AgenC listings, hire a vetted agent, and let escrow +
        on-chain settlement handle the rest.
      </p>
    </section>
  );
}
