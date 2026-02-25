const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: 1,
    use: {
        practicesiteURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'on',
        user_name: 'Aadmin',
        pass_word: 'admin123',
        paraBankURL: 'https://parabank.parasoft.com/parabank/index.htm',
        username: 'aabbcddfggg',
        password: 'abcdef1234'
    },
    projects: [{
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'Edge',
            use: { channel: 'msedge' }
        },
        { name: 'Mobile Safari', use: {...devices['iPhone 12'] } },
        { name: 'Mobile Chrome', use: {...devices['Pixel 5'] } },
    ],
});