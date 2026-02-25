import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test('Signing up with valid details', async({ page }, testInfo) => {
        const {
            paraBankURL,
            username,
            password
        } = testInfo.project.use;

        await page.goto(paraBankURL);
        await page.click('text=Register');
        await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toHaveText('Signing up is easy!');

        await page.fill('[name="customer.firstName"]', 'testuser1');
        await page.fill('[name="customer.lastName"]', 'user11');
        await page.fill('[name="customer.address.street"]', 'adress1');
        await page.fill('[name="customer.address.city"]', 'NYKK');
        await page.fill('[name="customer.address.state"]', 'NYKK');
        await page.fill('[name="customer.address.zipCode"]', '635801');
        await page.fill('[name="customer.phoneNumber"]', '45678901234');
        await page.fill('[name="customer.ssn"]', '123456789');
        await page.fill('[name="customer.username"]', username);
        await page.fill('[name="customer.password"]', password);
        await page.fill('[name="repeatedPassword"]', password);
        await page.click('input[value="Register"]');

        const welcomeLocator = page.locator('#rightPanel h1.title');
        const successLocator = page.locator('#rightPanel p');
        const headingText = await welcomeLocator.innerText();

        if (headingText.startsWith('Welcome')) {
            await expect(welcomeLocator).toHaveText(`Welcome ${username}`);
            await expect(successLocator).toHaveText('Your account was created successfully. You are now logged in.');
            console.log('--- Signup Success ---');
            console.log(headingText);
            console.log(await successLocator.innerText());
        } else {
            const errorLocator = page.locator('#customer\\.username\\.errors');
            await expect(errorLocator).toHaveText('This username already exists.');
            console.log('--- Duplicate Signup Attempt ---');
            console.log(await errorLocator.innerText());
        }
    });
});