import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MiniCartPage extends BasePage{
    protected miniCart: string

    constructor(page){
        super(page);
        this.miniCart = '#dropdownBasket';
    }

    async cleanCart(){
        await this.basePageClick(this.page.locator('.actionBuyProduct').nth(0))
        await this.basePageClick(this.miniCart)
        await this.basePageClick('a:has-text("Очистить корзину")')
    }

    async quantityProduct(){
        const productCount: string = await this.page.locator('.basket-count-items').innerText();
        const numberProduct: number = Number(productCount)
        await expect(this.page.locator('.basket-count-items')).toHaveCount(numberProduct)
    }
}