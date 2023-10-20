import { devices, defineConfig } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';
export default defineConfig({
  testDir: './__tests__/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 10 : 10,
  reporter: process.env.CI ? 'blob' : 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    baseURL: BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        screenshot: 'on',
        launchOptions: {
          args: ['--headless', '--no-sandbox', '--use-angle=gl'],
        },
      },
    },
  ],
  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
});
