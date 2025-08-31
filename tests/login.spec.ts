import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';


test.describe('Login flow', () => {
    let mp: ManagePage;

    // Before each test, create a new ManagePage (and thus new page objects)
    test.beforeEach(({ page }) => {
        mp = new ManagePage(page);
    });

    test('should login with valid credentials', async () => {
        await mp.loginPage.openLoginPage()
        await mp.loginPage.fillLoginPage()
    });
})