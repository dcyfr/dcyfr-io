import type { Product, ProductTier } from '@/lib/products';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const tierBorderColors: Record<ProductTier, string> = {
  framework: 'border-dcyfr-accent/40',
  templates: 'border-blue-500/30',
  research: 'border-emerald-500/30',
  agents: 'border-violet-500/30',
  infrastructure: 'border-orange-500/30',
  tools: 'border-cyan-500/30',
};

const tierAccentColors: Record<ProductTier, string> = {
  framework: 'text-dcyfr-accent',
  templates: 'text-blue-400',
  research: 'text-emerald-400',
  agents: 'text-violet-400',
  infrastructure: 'text-orange-400',
  tools: 'text-cyan-400',
};

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const borderColor = tierBorderColors[product.tier];
  const accentColor = tierAccentColors[product.tier];

  const cardContent = (
    <div
      className={clsx(
        'group relative flex flex-col rounded-xl border bg-card/70 p-6',
        'transition-all duration-200',
        product.available
          ? [borderColor, 'hover:bg-muted/70 hover:shadow-lg']
          : 'border-input/40',
        featured && 'ring-1 ring-dcyfr-accent/20'
      )}
    >
      {/* Coming soon badge */}
      {!product.available && (
        <span className="absolute right-4 top-4 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground border border-input/60">
          Phase {product.phase}
        </span>
      )}

      {/* Icon + TLD */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {product.icon}
        </span>
        <span className={clsx('text-xs font-mono font-semibold', accentColor)}>
          {product.tld}
        </span>
      </div>

      {/* Name + positioning */}
      <h3 className="mb-1 text-lg font-semibold text-white">{product.name}</h3>
      <p className={clsx('mb-2 text-xs font-medium', accentColor)}>{product.positioning}</p>
      <p className="mb-5 flex-1 text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* CTA */}
      {product.available ? (
        <span
          className={clsx(
            'inline-flex items-center gap-1 text-sm font-medium transition-colors',
            accentColor,
            'group-hover:underline'
          )}
        >
          {product.cta}
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">Coming {product.phase === 2 ? 'Q3 2026' : product.phase === 3 ? 'Q4 2026' : '2027'}</span>
      )}
    </div>
  );

  if (!product.available || product.id === 'dcyfr-io') {
    return cardContent;
  }

  return (
    <a href={product.url} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dcyfr-accent rounded-xl">
      {cardContent}
    </a>
  );
}
