import { useEffect, useState } from 'react';

// Two wombat icon sets live in /public as `wombat_1_*` and `wombat_2_*`. We
// alternate between them every 5 minutes — both in the browser-tab favicon and
// in the header logo.
export const WOMBAT_VARIANTS = [1, 2] as const;
const CYCLE_MS = 10 * 1000; // 5 minutes

const base = process.env.PUBLIC_URL || '';

// Which variant is "current" for a given moment. Derived from the clock (rather
// than a plain toggle) so the icon stays consistent across reloads and tabs, and
// realigns even after the tab has been backgrounded/throttled.
function variantAt(now: number): number {
  const index = Math.floor(now / CYCLE_MS) % WOMBAT_VARIANTS.length;
  return WOMBAT_VARIANTS[index];
}

// Public asset path for one of a variant's icon files.
export function wombatAsset(variant: number, file: string): string {
  return `${base}/wombat_${variant}_${file}`;
}

// Point the document's favicon links at the given variant. The <link> elements
// are defined (with ids) in public/index.html.
export function setFavicons(variant: number): void {
  const files: Record<string, string> = {
    'fav-ico': 'favicon.ico',
    'fav-32': 'favicon-32x32.png',
    'fav-16': 'favicon-16x16.png',
    'fav-apple': 'apple-touch-icon.png',
  };
  for (const [id, file] of Object.entries(files)) {
    const el = document.getElementById(id) as HTMLLinkElement | null;
    if (el) el.href = wombatAsset(variant, file);
  }
}

// Current wombat variant (1 or 2), flipping every 5 minutes. Checks the clock on
// a short interval so the swap lands close to each boundary without relying on a
// single long-lived timer surviving tab throttling.
export function useWombatVariant(): number {
  const [variant, setVariant] = useState(() => variantAt(Date.now()));

  useEffect(() => {
    const tick = () => setVariant(variantAt(Date.now()));
    const id = window.setInterval(tick, 15 * 1000); // re-check every 15s
    return () => window.clearInterval(id);
  }, []);

  return variant;
}
