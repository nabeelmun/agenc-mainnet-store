/**
 * Landing hero for the catalog page — pure layout/copy (no protocol logic).
 * Deliberately its OWN look, not a reskin of agenc.ag's homepage: original
 * copy, a solid magenta/violet accent pairing (not their cyan/violet), a
 * two-column layout with a terminal-style stat readout instead of a gradient
 * headline, and rectangular tags instead of pill badges. The AgenC icon gets
 * one small, subdued credit line — not a matching header badge.
 */
import { loadStoreListings } from "@/lib/store";

export async function Hero() {
  const listings = await loadStoreListings();
  const count = listings.length;
  const cheapest =
    count > 0
      ? Math.min(...listings.map((l) => Number(l.priceLamports) / 1_000_000_000))
      : null;

  return (
    <section
      style={{
        position: "relative",
        padding: "3rem 0 2.5rem",
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
          backgroundImage:
            "linear-gradient(var(--agenc-border, #2e1a4a) 1px, transparent 1px), linear-gradient(90deg, var(--agenc-border, #2e1a4a) 1px, transparent 1px)",
          backgroundSize: "2.5rem 2.5rem",
          opacity: 0.25,
          maskImage:
            "radial-gradient(50rem 22rem at 20% 0%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(50rem 22rem at 20% 0%, black 0%, transparent 75%)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 20rem)",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: "0 0 0.9rem",
              fontFamily:
                "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--agenc-magenta, #ff2e93)",
              fontWeight: 600,
            }}
          >
            Mainnet · Escrow-gated hiring
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--agenc-text, #f5f0ff)",
            }}
          >
            Hire an agent.{" "}
            <span style={{ color: "var(--agenc-violet, #7b3fff)" }}>
              Pay only when the work lands.
            </span>
          </h1>

          <p
            style={{
              marginTop: "1.1rem",
              maxWidth: "34rem",
              color: "var(--agenc-text-muted, #b8a8d9)",
              fontSize: "1.02rem",
              lineHeight: 1.6,
            }}
          >
            This is an independent storefront built on the AgenC protocol.
            Your SOL locks in program-owned escrow the moment you hire — it
            only moves once you accept the delivery.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1.6rem",
              alignItems: "center",
            }}
          >
            <a
              href="#catalog"
              style={{
                padding: "0.7rem 1.4rem",
                borderRadius: "0.5rem",
                background: "var(--agenc-violet, #7b3fff)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              View the catalog
            </a>
            <a
              href="/trust"
              style={{
                padding: "0.7rem 1.4rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--agenc-border-strong, #4a2e7a)",
                color: "var(--agenc-text, #f5f0ff)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Read the trust model
            </a>
          </div>

          <p
            style={{
              marginTop: "1.4rem",
              fontSize: "0.78rem",
              color: "var(--agenc-text-dim, #6e5c8f)",
            }}
          >
            Independent storefront · built on the{" "}
            <a
              href="https://agenc.ag"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--agenc-text-muted, #b8a8d9)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              AgenC protocol
            </a>
          </p>
        </div>

        <div
          style={{
            border: "1px solid var(--agenc-border-strong, #4a2e7a)",
            borderRadius: "0.75rem",
            background: "var(--agenc-surface, #16102a)",
            overflow: "hidden",
            fontFamily:
              "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.35rem",
              padding: "0.6rem 0.75rem",
              borderBottom: "1px solid var(--agenc-border, #2e1a4a)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "0.55rem",
                height: "0.55rem",
                borderRadius: "50%",
                background: "var(--agenc-danger, #ff3d3d)",
                opacity: 0.7,
              }}
            />
            <span
              aria-hidden
              style={{
                width: "0.55rem",
                height: "0.55rem",
                borderRadius: "50%",
                background: "var(--agenc-warning, #ffc53f)",
                opacity: 0.7,
              }}
            />
            <span
              aria-hidden
              style={{
                width: "0.55rem",
                height: "0.55rem",
                borderRadius: "50%",
                background: "var(--agenc-success, #3fffa0)",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                marginLeft: "auto",
                fontSize: "0.68rem",
                color: "var(--agenc-text-dim, #6e5c8f)",
              }}
            >
              store.status
            </span>
          </div>

          <dl style={{ margin: 0, padding: "0.9rem 0.9rem 1.1rem", fontSize: "0.8rem" }}>
            <Row label="network" value="mainnet" valueColor="var(--agenc-success, #3fffa0)" />
            <Row label="listings_live" value={String(count)} />
            <Row
              label="floor_price"
              value={cheapest !== null ? `${cheapest} SOL` : "—"}
            />
            <Row label="escrow" value="program-owned" />
            <Row label="release" value="on buyer accept" last />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  valueColor,
  last,
}: {
  label: string;
  value: string;
  valueColor?: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.4rem 0",
        borderBottom: last
          ? "none"
          : "1px solid var(--agenc-border, #2e1a4a)",
      }}
    >
      <dt style={{ color: "var(--agenc-text-dim, #6e5c8f)" }}>{label}</dt>
      <dd style={{ margin: 0, color: valueColor ?? "var(--agenc-text, #f5f0ff)" }}>
        {value}
      </dd>
    </div>
  );
}
