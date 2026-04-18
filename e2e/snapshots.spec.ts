import { test, expect } from '@playwright/test';

/**
 * Visual regression baseline per
 * openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md#51-screenshot-baseline
 *
 * First-run flow: `npm run test:snapshots -- --update-snapshots` captures
 * baselines into e2e/snapshots/. Commit the resulting PNGs. Subsequent
 * preview deploys diff against them; failures flag visual regressions.
 *
 * dcyfr.io is a portal site — minimal route surface. Two views covered:
 * - `/` home (full portal)
 * - `/#products` anchored to product grid (hash scroll is the primary interior affordance)
 *
 * Both captured at desktop (1440×900) and mobile (375×812). Motion paused to
 * avoid flakiness on the Phase-3 chip pulse + card hover transitions.
 */

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 375, height: 812, name: 'mobile' },
] as const;

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/#products', name: 'products-anchor' },
] as const;

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} @ ${vp.name}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Let initial layout + font-swap settle before snapshot
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`${route.name}-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled',
      });
    });
  }
}
