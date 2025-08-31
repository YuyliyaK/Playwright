import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';


test.describe('Авторизация пользователя', () => {
    let mp: ManagePage;

    // Before each test, create a new ManagePage (and thus new page objects)
    test.beforeEach(async ({ page }) => {
        mp = new ManagePage(page);
    });

    test('Проверка успешной авторизации пользователя', async () => {
        await mp.loginPage.openLoginPage()
        await mp.loginPage.fillLoginPage()
        await mp.loginPage.randomRememberUser()
        await mp.loginPage.pressSubmit()
        await mp.productPage.checkOpenPage()
    });
})