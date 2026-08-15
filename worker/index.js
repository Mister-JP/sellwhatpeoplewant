/**
 * Serves the compiled public files at the OpenAI Sites worker boundary. Unknown
 * browser routes fall back to the application document so `/learn/system-map`
 * works when opened directly, while missing files and non-navigation requests
 * keep their original response instead of being disguised as successful HTML.
 */
export default {
  async fetch(request, environment) {
    const assetResponse = await environment.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get('Accept')?.includes('text/html') ?? false;
    const shouldUseApplicationDocument =
      request.method === 'GET' && assetResponse.status === 404 && acceptsHtml;

    if (!shouldUseApplicationDocument) {
      return assetResponse;
    }

    const applicationDocumentUrl = new URL(request.url);
    applicationDocumentUrl.pathname = '/index.html';

    return environment.ASSETS.fetch(new Request(applicationDocumentUrl, request));
  },
};
