import type { Config } from 'tailwindcss';
import dcyfrPreset from './tailwind.preset';

/**
 * dcyfr.io Tailwind v3 config.
 *
 * Composes the legacy `./tailwind.preset.ts` (dcyfr-* palette used by existing
 * pages) with the semantic-var bridge below, which maps CSS variables from
 * `app/globals.css` into Tailwind utility classes consumed by the @dcyfr-labs
 * registry primitives (bg-background, text-primary, ring-secure, etc.).
 *
 * Both systems coexist during Phase 1 scaffolding. The legacy preset retires
 * in Phase 2/3 once all pages migrate to semantic vars.
 *
 * @see docs/dcyfr-workspace/sites/dcyfr-io.md for identity
 * @see openspec/changes/dcyfr-skeleton-sites-scaffolding/spec.md §1 for the required set
 */
const config: Config = {
  presets: [dcyfrPreset],
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic-var bridge (consumed by @dcyfr-labs/* primitives)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // DCYFR-specific semantic tokens
        secure: {
          DEFAULT: 'hsl(var(--secure))',
          foreground: 'hsl(var(--secure-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        brand: 'var(--ease-brand)',
      },
    },
  },
  plugins: [],
};

export default config;
