import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'cobertura'],
      exclude: ['src/index.ts', 'tests/**/*.test.ts']
    }
  }
});
