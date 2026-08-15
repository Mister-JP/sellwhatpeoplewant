/**
 * Protects the deployment boundary that serves both real files and direct visits
 * to client-side routes. The fake asset binding models the single Cloudflare API
 * this worker consumes; it intentionally excludes CDN and caching behavior that
 * belongs to the hosting platform rather than this repository.
 */
import { describe, expect, it, vi } from 'vitest';
import siteWorker from './index.js';

function createAssetEnvironment(assetFetch) {
  return { ASSETS: { fetch: assetFetch } };
}

describe('site worker', () => {
  it('returns an existing public asset without requesting the application document', async () => {
    const assetFetch = vi.fn(async () => new Response('public file', { status: 200 }));
    const request = new Request('https://example.test/robots.txt');

    const response = await siteWorker.fetch(
      request,
      createAssetEnvironment(assetFetch),
    );

    expect(await response.text()).toBe('public file');
    expect(assetFetch).toHaveBeenCalledTimes(1);
  });

  it('serves the application document for a direct browser visit to a public route', async () => {
    const assetFetch = vi
      .fn()
      .mockResolvedValueOnce(new Response('missing', { status: 404 }))
      .mockResolvedValueOnce(new Response('<main>system map</main>', { status: 200 }));
    const request = new Request('https://example.test/learn/system-map', {
      headers: { Accept: 'text/html' },
    });

    const response = await siteWorker.fetch(
      request,
      createAssetEnvironment(assetFetch),
    );

    expect(await response.text()).toContain('system map');
    expect(assetFetch).toHaveBeenCalledTimes(2);
    expect(assetFetch.mock.calls[1]?.[0]).toMatchObject({
      url: 'https://example.test/index.html',
    });
  });

  it('preserves a missing response for non-navigation requests', async () => {
    const assetFetch = vi.fn(async () => new Response('missing', { status: 404 }));
    const request = new Request('https://example.test/api/unknown', {
      headers: { Accept: 'application/json' },
    });

    const response = await siteWorker.fetch(
      request,
      createAssetEnvironment(assetFetch),
    );

    expect(response.status).toBe(404);
    expect(assetFetch).toHaveBeenCalledTimes(1);
  });
});
