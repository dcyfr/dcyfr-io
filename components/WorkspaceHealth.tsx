'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

type HealthStatus = 'healthy' | 'degraded' | 'unavailable' | 'loading';

interface GatewayHealth {
  status: HealthStatus;
  capabilities: string[];
  uptime?: number;
  message?: string;
}

async function fetchGatewayHealth(): Promise<GatewayHealth> {
  try {
    const res = await fetch('http://127.0.0.1:3200/intelligence/health', {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return { status: 'degraded', capabilities: [] };
    const data = await res.json();
    return {
      status: data.status === 'ok' ? 'healthy' : 'degraded',
      capabilities: data.capabilities ?? [],
      uptime: data.uptime,
    };
  } catch {
    return { status: 'unavailable', capabilities: [] };
  }
}

const statusConfig: Record<HealthStatus, { label: string; dotClass: string; textClass: string }> = {
  healthy:     { label: 'Workspace healthy',     dotClass: 'bg-green-400',         textClass: 'text-green-400' },
  degraded:    { label: 'Workspace degraded',    dotClass: 'bg-yellow-400',        textClass: 'text-yellow-400' },
  unavailable: { label: 'Gateway unavailable',   dotClass: 'bg-muted', textClass: 'text-muted-foreground' },
  loading:     { label: 'Checking status...',    dotClass: 'bg-muted animate-pulse', textClass: 'text-muted-foreground' },
};

export function WorkspaceHealth() {
  const [health, setHealth] = useState<GatewayHealth>({ status: 'loading', capabilities: [] });

  useEffect(() => {
    fetchGatewayHealth().then(setHealth);
  }, []);

  const config = statusConfig[health.status];

  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx('h-2 w-2 rounded-full', config.dotClass)}
        aria-hidden="true"
      />
      <span className={clsx('text-xs font-medium', config.textClass)}>
        {config.label}
      </span>
      {health.capabilities.length > 0 && (
        <span className="text-xs text-muted-foreground">
          · {health.capabilities.length} capabilities
        </span>
      )}
    </div>
  );
}
