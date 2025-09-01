import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MiniCartPage extends BasePage{
    protected miniCart: string
    protected deleteProductButton: string
    protected miniCartModal: string
    protected openCartPage: string
    protected productName: string
    protected productPrice: string
    

    constructor(page){
        super(page);
        this.miniCart = '#dropdownBasket';
        this.deleteProductButton = 'a:has-text("Очистить корзину")';
        this.miniCartModal = '//*[@id="basketContainer"]/div[2]';
        this.openCartPage = 'a:has-text("Перейти в корзину")';
        this.productName = "//span[@class='basket-item-title']";
        this. productPrice = "//span[@class='basket-item-price']";
    }
    async openMiniCart(){
        await this.basePageClick(this.miniCart)
    }
    async deleteProduct(){
        await this.basePageClick(this.deleteProductButton)
    }

    async cleanCartByAddingProduct(){
        await this.basePageClick(this.page.locator('.actionBuyProduct').nth(0))
        await this.openMiniCart()
        await this.deleteProduct()
    }

    async checkQuantityProduct(){
        const productCount: string = await this.page.locator('//*[@id="basketContainer"]/span').innerText()
        if (Number(productCount) != 0) {
            console.log(productCount)
            await this.openMiniCart()
            await this.deleteProduct()
        }
    }

    async cleanCart(){
        let randomNumber: number = Math.ceil(Math.random()*2)
        //console.log(randomNumber)
        if (randomNumber == 1){
           await this.cleanCartByAddingProduct()
        } else {
            this.checkQuantityProduct()
        }

    }

    async checkOpenningMiniCart(){
        await this.basePageExpectVisible(this.miniCartModal)
        await this.basePageExpectVisible(this.deleteProductButton)
        await this.basePageExpectVisible(this.openCartPage)
    }

    async openUserCartPage(){
        await this.basePageClick(this.openCartPage)
    }

    async checkProductInfo_oneProduct(title: string, price: string){
       await expect(this.page.locator(this.productName)).toHaveText(title)
       let productQuantity: string = await this.page.locator(`//span[text()='${title}']/../span[contains(@class,'count')]`).innerText()
       let actualPrice: string = Number(productQuantity) * Number(price) + ''
       await expect(this.page.locator(this.productPrice)).toContainText(actualPrice)
    }
    
}