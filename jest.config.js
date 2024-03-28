module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    'src/**/*.{js,jsx,ts,tsx}': {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  reporters: ['default'],
};
