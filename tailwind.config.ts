import type { Config } from 'tailwindcss';

/**
 * dcyfr.io Tailwind v3 config.
 *
 * The semantic-var bridge below maps CSS variables from `app/globals.css`
 * into Tailwind utility classes consumed by the @dcyfr-labs registry
 * primitives (bg-background, text-primary, ring-secure, etc.).
 *
 * The legacy `./tailwind.preset.ts` + its `dcyfr-primary-*` / `dcyfr-accent-*`
 * palette was retired 2026-04-18 under openspec/changes/dcyfr-palette-class-migration
 * (pilot). All 42 call sites migrated to semantic-var utilities via the
 * scripts/polish-loop/palette-class-codemod.mjs sweep.
 *
 * @see docs/dcyfr-workspace/sites/dcyfr-io.md for identity
 */
const config: Config = {
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
