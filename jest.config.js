// jest.config.js
module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageReporters: ["html"],
    collectCoverage: true,
};