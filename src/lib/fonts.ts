/**
 * `Audiowide` — the display font agenc.ag itself uses for headings
 * (`--font-display` in their vendored theme). Self-hosted via `next/font/google`
 * (no runtime request to Google Fonts), used only for the hero heading so the
 * storefront reads as part of the same visual family.
 */
import { Audiowide } from "next/font/google";

export const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
