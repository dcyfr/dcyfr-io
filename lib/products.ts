export type ProductTier = 'framework' | 'templates' | 'research' | 'infrastructure' | 'agents' | 'tools';

export interface Product {
  id: string;
  name: string;
  tld: string;
  url: string;
  positioning: string;
  description: string;
  tier: ProductTier;
  icon: string;
  cta: string;
  available: boolean;
  phase: 1 | 2 | 3 | 4;
}

export const PRODUCTS: Product[] = [
  {
    id: 'dcyfr-app',
    name: 'Templates',
    tld: 'dcyfr.app',
    url: 'https://dcyfr.app',
    positioning: 'Production-ready starter templates',
    description:
      '8 battle-tested starter templates for AI-powered apps. Next.js, GraphQL, RAG, Chatbot, and more.',
    tier: 'templates',
    icon: '📦',
    cta: 'Browse Templates',
    available: true,
    phase: 1,
  },
  {
    id: 'dcyfr-io',
    name: 'Portal',
    tld: 'dcyfr.io',
    url: 'https://dcyfr.io',
    positioning: 'The control center for DCYFR',
    description: 'Your unified entry point to the entire DCYFR product ecosystem.',
    tier: 'framework',
    icon: '🏠',
    cta: 'You are here',
    available: true,
    phase: 1,
  },
  {
    id: 'dcyfr-tech',
    name: 'Research',
    tld: 'dcyfr.tech',
    url: 'https://dcyfr.tech',
    positioning: 'AI research hub & thought leadership',
    description:
      'Deep-dive articles, whitepapers, and tutorials on agent design, context engineering, and AI patterns.',
    tier: 'research',
    icon: '🔬',
    cta: 'Read Research',
    available: true,
    phase: 2,
  },
  {
    id: 'dcyfr-codes',
    name: 'Patterns',
    tld: 'dcyfr.codes',
    url: 'https://dcyfr.codes',
    positioning: 'Searchable code patterns & recipes',
    description:
      'Agent delegation patterns, RAG pipelines, code generation workflows — searchable and runnable.',
    tier: 'research',
    icon: '💡',
    cta: 'Explore Patterns',
    available: true,
    phase: 2,
  },
  {
    id: 'dcyfr-bot',
    name: 'Agents',
    tld: 'dcyfr.bot',
    url: 'https://dcyfr.bot',
    positioning: 'Agent marketplace & capability browser',
    description:
      '32 production agents with capability manifests, reputation scores, and a live test chat interface.',
    tier: 'agents',
    icon: '🤖',
    cta: 'Browse Agents',
    available: false,
    phase: 3,
  },
  {
    id: 'dcyfr-build',
    name: 'Infrastructure',
    tld: 'dcyfr.build',
    url: 'https://dcyfr.build',
    positioning: 'Docker, K8s, and CI/CD template library',
    description:
      'Infrastructure templates with configurator, cost estimator, and deep-dive deployment guides.',
    tier: 'infrastructure',
    icon: '🏗️',
    cta: 'View Infrastructure',
    available: false,
    phase: 3,
  },
  {
    id: 'dcyfr-work',
    name: 'Developer Tools',
    tld: 'dcyfr.work',
    url: 'https://dcyfr.work',
    positioning: 'CLI reference, VS Code extensions & profiles',
    description:
      'Interactive CLI tutorials, VS Code extension marketplace, and developer identity profiles.',
    tier: 'tools',
    icon: '🛠️',
    cta: 'Explore Tools',
    available: false,
    phase: 4,
  },
];

export const TIER_ORDER: ProductTier[] = [
  'framework',
  'templates',
  'research',
  'agents',
  'infrastructure',
  'tools',
];

export const TIER_LABELS: Record<ProductTier, string> = {
  framework: 'Platform',
  templates: 'Templates',
  research: 'Research & Patterns',
  agents: 'Agents',
  infrastructure: 'Infrastructure',
  tools: 'Developer Tools',
};
