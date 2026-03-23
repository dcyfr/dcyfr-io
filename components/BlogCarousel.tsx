import type { RssFeedItem } from '@/lib/types';

interface BlogCarouselProps {
  items: RssFeedItem[];
}

function formatDate(rfc: string): string {
  try {
    return new Date(rfc).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return rfc;
  }
}

export function BlogCarousel({ items }: Readonly<BlogCarouselProps>) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-dcyfr-primary-800/40 px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="blog-heading" className="text-xs font-semibold uppercase tracking-widest text-dcyfr-accent">
            From the Research Hub
          </h2>
          <a
            href="https://dcyfr.tech"
            className="text-xs text-dcyfr-primary-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            dcyfr.tech →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-dcyfr-primary-700/60 bg-dcyfr-primary-900/60 p-4 hover:border-dcyfr-accent/40 transition-colors"
            >
              {item.category && (
                <span className="mb-2 block text-xs font-medium text-dcyfr-accent-300">{item.category}</span>
              )}
              <h3 className="text-sm font-semibold text-white group-hover:text-dcyfr-accent-300 transition-colors leading-snug mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-dcyfr-primary-300 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
              <time className="text-xs text-dcyfr-primary-300">{formatDate(item.pubDate)}</time>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
