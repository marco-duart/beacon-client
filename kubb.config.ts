import { defineConfig } from '@kubb/core';
import { pluginClient } from '@kubb/plugin-client';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';

const BACKEND_URL = process.env.VITE_API_URL ?? 'http://localhost:3000';

// Keeps the dashboard's types/schemas/API calls in continuous sync with the
// NestJS backend's OpenAPI document. Run `npm run generate:api` whenever the
// backend's Swagger contract changes (ingest never touches this — it goes
// straight to POST /events with X-Beacon-Key, no dashboard auth involved).
export default defineConfig({
  root: '.',
  input: {
    path: `${BACKEND_URL}/api/docs-json`,
  },
  output: {
    path: 'src/api/generated',
    clean: true,
  },
  plugins: [
    pluginOas({ output: false }),
    pluginTs({
      output: { path: 'types' },
    }),
    pluginZod({
      output: { path: 'zod' },
    }),
    pluginClient({
      output: { path: 'client' },
      importPath: '@/config/kubb-client',
      parser: 'zod',
      dataReturnType: 'data',
    }),
  ],
});
