// jest.config.js
require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageReporters: ['html'],
    collectCoverage: true,
};
