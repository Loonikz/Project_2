/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '../../utils/styles/*.scss'
  ],
  // 'moduleNameMapper': {
  //   '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  // },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.(css|scss)$': '<rootDir>/src/jest-config/style-mock.js',
  },
  setupFiles: ['<rootDir>/src/jest-config/LocalStorageMock.ts']
};
