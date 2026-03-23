import type { Metadata } from 'next';
import { ProductCard } from '@/components/ProductCard';
import { WorkspaceHealth } from '@/components/WorkspaceHealth';
import { UnifiedSearch } from '@/components/UnifiedSearch';
import { BlogCarousel } from '@/components/BlogCarousel';
import { PRODUCTS, TIER_ORDER, TIER_LABELS } from '@/lib/products';
import type { RssFeedItem } from '@/lib/types';

// ISR: revalidate blog feed every hour
export const revalidate = 3600;

async function fetchBlogFeed(): Promise<RssFeedItem[]> {
  try {
    const res = await fetch('https://dcyfr.tech/rss.xml', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items: RssFeedItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch: RegExpExecArray | null;
    while ((itemMatch = itemRegex.exec(xml)) !== null) {
      const content = itemMatch[1];
      const get = (tag: string) =>
        new RegExp(String.raw`<${tag}>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/${tag}>`).exec(content)?.[1]?.trim() ?? '';
      items.push({
        title: get('title'),
        link: get('link'),
        description: get('description'),
        pubDate: get('pubDate'),
        category: get('category'),
      });
    }
    return items.slice(0, 3);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'DCYFR — The Control Center for AI-Powered Development',
};

// Schema.org Organization markup (task 5.5)
function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'DCYFR',
          url: 'https://dcyfr.io',
          logo: 'https://dcyfr.io/logo.png',
          description:
            'DCYFR builds AI-powered development frameworks, tools, and infrastructure for modern software teams.',
          sameAs: [
            'https://github.com/dcyfr',
            'https://dcyfr.app',
            'https://dcyfr.tech',
            'https://dcyfr.codes',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@dcyfr.dev',
            contactType: 'customer support',
          },
        }),
      }}
    />
  );
}

export default async function HomePage() {
  const blogItems = await fetchBlogFeed();

  // Group products by tier in defined order
  const byTier = TIER_ORDER.reduce<Record<string, typeof PRODUCTS>>((acc, tier) => {
    const products = PRODUCTS.filter((p) => p.tier === tier);
    if (products.length > 0) acc[tier] = products;
    return acc;
  }, {});

  return (
    <>
      <OrganizationJsonLd />
      <div className="min-h-screen">
        {/* Nav */}
        <header className="sticky top-0 z-10 border-b border-dcyfr-primary-800/60 bg-dcyfr-primary-950/95 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                dcyfr<span className="text-dcyfr-accent">.io</span>
              </span>
            </a>
            <nav className="flex items-center gap-5 text-sm" aria-label="Main navigation">
              <a href="#products" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                Products
              </a>
              <a href="https://dcyfr.app" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                Templates
              </a>
              <a href="https://dcyfr.tech" target="_blank" rel="noopener noreferrer" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                Research
              </a>
              <a href="https://dcyfr.codes" target="_blank" rel="noopener noreferrer" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                Codes
              </a>
              <a
                href="https://github.com/dcyfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dcyfr-primary-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <WorkspaceHealth />
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-dcyfr-primary-800/40 bg-gradient-to-b from-dcyfr-primary-950 to-dcyfr-primary-900/60 px-4 py-20 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          {/* Background grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(to right, hsl(222,47%,50%) 1px, transparent 1px), linear-gradient(to bottom, hsl(222,47%,50%) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dcyfr-accent/20 bg-dcyfr-accent/10 px-4 py-1.5 text-xs font-semibold text-dcyfr-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-dcyfr-accent animate-pulse" aria-hidden="true" />
              Phase 3 — In Progress
            </div>
            <h1
              id="hero-heading"
              className="mb-5 text-5xl font-bold tracking-tight text-white sm:text-6xl"
            >
              The control center for{' '}
              <span className="text-dcyfr-accent">AI-powered</span> development
            </h1>
            <p className="mb-8 text-xl text-dcyfr-primary-300 leading-relaxed max-w-2xl mx-auto">
              DCYFR builds the frameworks, templates, agents, and infrastructure
              you need to ship AI-powered applications faster.
            </p>

            {/* Primary CTAs */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://dcyfr.app"
                className="rounded-lg bg-dcyfr-accent-700 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-dcyfr-accent-600 focus-visible:outline-2"
              >
                Browse Templates
              </a>
              <a
                href="#products"
                className="rounded-lg border border-dcyfr-primary-600/60 px-7 py-3 text-sm font-semibold text-dcyfr-primary-200 transition-colors hover:border-dcyfr-accent/40 hover:text-white"
              >
                Explore Products
              </a>
            </div>

            {/* Unified search */}
            <UnifiedSearch />
          </div>
        </section>

        {/* Stats */}
        <div className="border-b border-dcyfr-primary-800/40 bg-dcyfr-primary-900/40">
          <div className="mx-auto flex max-w-7xl flex-wrap divide-x divide-dcyfr-primary-800/60 px-4 sm:px-6 lg:px-8">
            {[
              { value: '26+', label: 'Packages' },
              { value: '8', label: 'Starter Templates' },
              { value: '32', label: 'Workspace Agents' },
              { value: '7', label: 'TLDs' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-1 min-w-[120px] px-6 py-4 text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-dcyfr-primary-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product sections */}
        <main id="products" className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-14">
            {Object.entries(byTier).map(([tier, products]) => (
              <section key={tier} aria-labelledby={`section-${tier}`}>
                <h2
                  id={`section-${tier}`}
                  className="mb-6 text-xs font-semibold uppercase tracking-widest text-dcyfr-accent"
                >
                  {TIER_LABELS[tier as keyof typeof TIER_LABELS]}
                </h2>
                <div
                  className={
                    products.length === 1
                      ? 'max-w-md'
                      : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
                  }
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* Blog carousel — ISR from dcyfr.tech RSS */}
        <BlogCarousel items={blogItems} />

        {/* Footer */}
        <footer className="border-t border-dcyfr-primary-800/60 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
              <div>
                <p className="text-lg font-bold text-white">
                  dcyfr<span className="text-dcyfr-accent">.io</span>
                </p>
                <p className="mt-1 text-sm text-dcyfr-primary-300">
                  The control center for AI-powered development
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm sm:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dcyfr-primary-300">
                    Products
                  </p>
                  <ul className="space-y-1.5">
                    <li><a href="https://dcyfr.app" className="text-dcyfr-primary-300 hover:text-white transition-colors">Templates</a></li>
                    <li><a href="https://dcyfr.tech" target="_blank" rel="noopener noreferrer" className="text-dcyfr-primary-300 hover:text-white transition-colors">Research</a></li>
                    <li><a href="https://dcyfr.codes" target="_blank" rel="noopener noreferrer" className="text-dcyfr-primary-300 hover:text-white transition-colors">Codes</a></li>
                    <li><span className="text-dcyfr-primary-500">Agents (Q4 2026)</span></li>
                    <li><span className="text-dcyfr-primary-500">Infrastructure (Q4 2026)</span></li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dcyfr-primary-300">
                    Community
                  </p>
                  <ul className="space-y-1.5">
                    <li>
                      <a href="https://github.com/dcyfr" target="_blank" rel="noopener noreferrer" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@dcyfr.dev" className="text-dcyfr-primary-300 hover:text-white transition-colors">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dcyfr-primary-300">
                    Legal
                  </p>
                  <ul className="space-y-1.5">
                    <li><a href="/trademark" className="text-dcyfr-primary-300 hover:text-white transition-colors">Trademark</a></li>
                    <li><a href="/privacy" className="text-dcyfr-primary-300 hover:text-white transition-colors">Privacy</a></li>
                    <li><a href="/terms" className="text-dcyfr-primary-300 hover:text-white transition-colors">Terms</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-dcyfr-primary-800/60 pt-6 text-xs text-dcyfr-primary-300">
              <p>© 2026 DCYFR. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
