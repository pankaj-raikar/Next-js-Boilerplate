import { afterEach, describe, expect, it } from 'vitest';
import { getBaseUrl, isServer } from './Helpers';

const ORIGINAL_ENV = { ...process.env };
const globalAny = globalThis as typeof globalThis & { window?: any };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  globalAny.window = undefined;
});

describe('getBaseUrl', () => {
  it('returns NEXT_PUBLIC_APP_URL when provided', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    expect(getBaseUrl()).toBe('https://example.com');
  });

  it('falls back to localhost when no environment variables are set', () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.VERCEL_ENV;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;

    expect(getBaseUrl()).toBe('http://localhost:3000');
  });
});

describe('isServer', () => {
  it('returns true when window is undefined', () => {
    globalAny.window = undefined;

    expect(isServer()).toBe(true);
  });

  it('returns false when window is defined', () => {
    globalAny.window = {};

    expect(isServer()).toBe(false);
  });
});
