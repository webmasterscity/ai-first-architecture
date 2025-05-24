// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './components',
  testMatch: '**/*visual-tests.js',
  
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 1000,
      animationHandling: 'disable',
      mode: 'strict'
    }
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'visual-testing/reports/html' }],
    ['json', { outputFile: 'visual-testing/reports/results.json' }],
    ['line']
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'visual-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
      testMatch: '**/*visual-tests.js'
    },
    {
      name: 'visual-tablet',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 768 }
      },
      testMatch: '**/*visual-tests.js'
    },
    {
      name: 'visual-mobile',
      use: { 
        ...devices['iPhone 13'],
        viewport: { width: 375, height: 667 }
      },
      testMatch: '**/*visual-tests.js'
    }
  ]
});
