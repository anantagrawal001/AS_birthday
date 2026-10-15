import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 30000
  },
  projects: [
    {
      name: 'Mobile Chrome (Emulated Phone)',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } }
    }
  ]
});
