const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /api\//,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testMatch: /.*api\.spec\.js/,
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
  ],
});

