import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Авторизация пользователя', () => {
    let mp: ManagePage;

    // Before each test, create a new ManagePage (and thus new page objects)
    test.beforeEach(async ({ page }) => {
        mp = new ManagePage(page);
        await mp.loginPage.authenticationUser()
    });

    test('Проверка успешной авторизации пользователя', async () => {
        // await mp.productPage.checkOpenPage()
        // await mp.miniCartPage.cleanCart()
        await mp.miniCartPage.quantityProduct()
    });
})