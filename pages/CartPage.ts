import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { validCredential } from "../test-data/parameters";

export class CartPage extends BasePage{
    constructor(page) {
        super(page)
    }

    async checkOpenPage(){
        await expect(this.page).toHaveURL('/basket')
        await expect(this.page.locator('#dropdownUser')).toContainText(validCredential.username)
        await this.basePageExpectVisible('#dropdownBasket')
        await expect(this.page.locator('.h3')).toHaveText('Корзина пользователя')
    }

}