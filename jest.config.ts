import type { Config } from '@jest/types';

// eslint-disable-next-line @typescript-eslint/require-await
export default async (): Promise<Config.InitialOptions> => ({
  coverageProvider: 'v8',
  preset: 'ts-jest',
  displayName: 'unit test',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  }
  // transform: {
  //   '^.+\\.tsx?$': 'esbuild-jest'
  // }
});
