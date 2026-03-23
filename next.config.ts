import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dcyfr/design-system'],
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG ?? 'dcyfr',
  project: process.env.SENTRY_PROJECT ?? 'dcyfr-io',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: '/monitoring',
  automaticVercelMonitors: true,
});
