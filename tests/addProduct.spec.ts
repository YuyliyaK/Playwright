import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Проверка открытия страницы корзины пользователя', () => {
    let mp: ManagePage;

    // Before each test, create a new ManagePage (and thus new page objects)
    test.beforeEach(async ({ page }) => {
        mp = new ManagePage(page);
        await mp.loginPage.authenticationUser()
        await page.waitForTimeout(3000);
        await mp.miniCartPage.cleanCartByAddingProduct();//mp.miniCartPage.cleanCart()
        await mp.productPage.checkOpenPage()
    });

    test.skip('Тест-кейс 1. Переход в пустую корзину', async () => {
        await mp.miniCartPage.openMiniCart()
        await mp.miniCartPage.checkOpenningMiniCart()
        await mp.miniCartPage.openUserCartPage()
        await mp.cartPage.checkOpenPage()
    });

    test.skip('Тест-кейс 2. Переход в корзину с 1 неакционным товаром', async () => {
        await mp.productPage.addSimpleProduct()
        await mp.miniCartPage.openMiniCart()
        await mp.miniCartPage.checkOpenningMiniCart()
        await mp.miniCartPage.openUserCartPage()
        await mp.cartPage.checkOpenPage()
    });
    test.skip('Тест-кейс 3. Переход в корзину с 1 акционным товаром.', async () => {
        await mp.productPage.addDiscountProduct()
        await mp.miniCartPage.openMiniCart()
        await mp.miniCartPage.checkOpenningMiniCart()
        await mp.miniCartPage.openUserCartPage()
        await mp.cartPage.checkOpenPage()
    });
    test.skip('Тест-кейс 4. Переход в корзину с 9 разными товарами', async () => {
        
    });
    test('Тест-кейс 5. Переход в корзину с 9 акционными товарами одного наименования', async () => {
        await mp.productPage.addProductByEnterCount()
    });
})