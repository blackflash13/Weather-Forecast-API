module.exports = {
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.js"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/mocks/"],
    verbose: true,
    setupFilesAfterEnv: ["./__tests__/setup.js"],
};
