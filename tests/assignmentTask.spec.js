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
            await logoutAndValidate(page);
        } else {
            const errorLocator = page.locator('#customer\\.username\\.errors');
            await expect(errorLocator).toHaveText('This username already exists.');
            console.log('--- Duplicate Signup Attempt ---');
            console.log(await errorLocator.innerText());
        }
    });

    test('Validate success or failure login', async({ page }, testInfo) => {
        const {
            practicesiteURL,
            user_name,
            pass_word
        } = testInfo.project.use;
        await page.goto(practicesiteURL);
        await expect(page.locator('h5:has-text("Login")')).toHaveText('Login');

        await page.getByPlaceholder('Username').fill(user_name);
        await page.fill('[name="password"]', pass_word);
        await page.getByRole('button', { name: 'Login' }).click();

        const successHeading = page.locator('h6.oxd-topbar-header-breadcrumb-module');
        const errorMessage = page.locator('.oxd-alert-content-text');

        if (await successHeading.isVisible()) {
            await expect(successHeading).toHaveText('Dashboard');
            console.log('--- Login Success ---');
            await logoutAndValidate(page);
        } else {
            await expect(errorMessage).toHaveText('Invalid credentials');
            console.log('--- Login Failed ---');
        }
    });
});

async function logoutAndValidate(page) {
    const parabankLogout = await page.click('text=Log Out');
    const hrmLogout = await page.click('text=Logout');

    if (await parabankLogout.isVisible()) {
        await parabankLogout.click();
        await expect(page.locator('h2')).toHaveText('Customer Login');
        console.log('---- Logged out from Parabank site');
    } else if (await hrmLogout.isVisible()) {
        await hrmLogout.click();
        await expect(page.locator('h5:has-text("Login")')).toHaveText('Login');
        console.log('---- Logged out from HRM site');
    }
}