import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test('Validate success or failure login', async({ page }, testInfo) => {
        const {
            herokuappURL,
            user_name,
            pass_word
        } = testInfo.project.use;

        await page.goto(herokuappURL);
        await expect(page.locator('h2')).toHaveText('Login Page');
        await page.locator('#username').fill(user_name);
        await page.locator('#password').fill(pass_word);
        await page.locator('.fa-sign-in').click();

        const successLogin = page.getByRole('heading', { name: /Welcome to the Secure Area/ });
        const failedLogin = page.locator('#flash');

        if (await successLogin.isVisible()) {
            console.log('-----------Login successful--------');
            await expect(successLogin).toBeVisible();
            await page.locator('.icon-signout').click();
        } else {
            await failedLogin.isVisible();
            console.log('------------Login Failed------------');
            await expect(failedLogin).toContainText('Your username is invalid!');
        }
    });
});