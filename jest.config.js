module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
};
