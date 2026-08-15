/**
 * Provides browser assertions and isolation shared by component tests. Feature
 * suites remain responsible for their own meaningful fixtures and interactions;
 * this file owns only cleanup that must happen consistently between tests.
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
