import { lazy } from 'react';
import type { ComponentType } from 'react';
import { loadRemote, registerRemotes } from '@module-federation/runtime';

const PROVIDERS = [
  {
    alias: 'shop',
    name: 'shop',
    entry: 'http://localhost:4174/remoteEntry.js',
  },
];

registerRemotes(
  PROVIDERS.map((provider) => ({
    ...provider,
    type: 'module' as const,
  })),
);

export function lazyProvider(alias: string, exposeName: string) {
  return lazy(() => loadRemote(`${alias}/${exposeName}`) as Promise<{ default: ComponentType }>);
}
