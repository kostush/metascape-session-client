// Sync object
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/test'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  testTimeout: 50000,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
};
module.exports = config;
