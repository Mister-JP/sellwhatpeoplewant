/**
 * Provides one validated entry point for the repository-authored public story.
 * UI components should not import JSON directly because TypeScript cannot prove
 * that hand-edited JSON preserves transition counts or required explanations.
 */
import candidateSystemMap from '../../../architecture/public-system-map.json';
import { parseSystemMapDocument } from './systemMapDocument';

export const currentSystemMap = parseSystemMapDocument(candidateSystemMap);
