/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  displayName: 'unit test',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  },
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  reporters: ['default', 'github-actions']
};

export default config;
