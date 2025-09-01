import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { validCredential } from "../test-data/parameters";
import { MiniCartPage } from "./MiniCartPage";

export class ProoductPage extends BasePage{

    protected withOutDiscount: string
    protected withDiscount: string
    protected miniCart: MiniCartPage
    protected checkDiscount: string
    protected countField: string
        
    constructor(page){
        super(page);
        this.withOutDiscount = '//*[@class="ribbon"]/span[not(text())]'
        this.withDiscount ="//span[@class='product_discount'][string-length(text()) > 0]"
        this.checkDiscount = '#gridCheck'
        this.countField = 'input[name="product-enter-count"]'
        
        this.miniCart = new MiniCartPage(page)

    }

    async checkOpenPage(){
        /*
        Проверка, что пользователь авторизован и подтягивается его логин
        Проверка наличия кнопки корзины
        Проверка наличия товаров 
        Проверка отображения кнопки "Купить"
        Проверка наличия блока обращения в службу поддержки
        */
        await expect(this.page.locator('#dropdownUser')).toContainText(validCredential.username)
        await this.basePageExpectVisible('#dropdownBasket')
        await expect(this.page.locator('.note-poster').first()).toBeVisible()//nth(randomNumber)
        await expect(this.page.locator('.actionBuyProduct').first()).toBeVisible()
        await expect(this.page.locator('.h3')).toHaveText('Обращение в службу поддержки')
        await this.basePageExpectVisible('#inputName')
        await this.basePageExpectVisible('#inputEmail')
        //for elem in await page.locator('.note-poster').all():

        // const await this.page.()
        // await this.basePageExpectVisible('.note-poster')
        //const headerText = await page.locator(".brd_hero__title.h1").innerText();
    }

    async addProduct(selector: string,numberProduct: number){
        await this.page.locator(selector + '/../../../../../div//button').nth(numberProduct).click()
       // let fullCount:number = await this.page.locator('//*[@class="ribbon"]/span[not(text())]').count()
        
    }

    async addSimpleProduct(){
        
        let allProductCount: number = await this.page.locator(this.withOutDiscount).count()
        let randomProductNumber: number = Math.floor(Math.random()*allProductCount) 
        let productName: string = await this.page.locator(this.withOutDiscount + "/../../../../../div//div[contains(@class,'product_name')]").nth(randomProductNumber).innerText()
        let productPrice: string = await this.page.locator(this.withOutDiscount + "/../../../../../div/div[2]//span[contains(@class,'product_price')]").nth(randomProductNumber).innerText()
        let productPriceValue: string = productPrice.split(' ')[0]
        await this.addProduct(this.withOutDiscount,randomProductNumber)
        await this.miniCart.openMiniCart()
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)

    }
    async showOnlyDiscountProduct(){
        await this.check_checkBox(this.checkDiscount)
    }
    async addProductByEnterCount(productNumber: number,productQuantity: string){
        await this.page.locator(this.countField).nth(productNumber).click()
        await this.page.locator(this.countField).nth(productNumber).clear()
        await this.page.locator(this.countField).nth(productNumber).type(productQuantity)

    }

    async addDiscountProduct(){
        let randomNumber: number = Math.ceil(Math.random()*2)
        if (randomNumber == 2){
            await this.showOnlyDiscountProduct()
        }
        let allProductCount: number = await this.page.locator(this.withDiscount).count()
        let randomProductNumber: number = Math.floor(Math.random()*allProductCount) 
        //let pages: boolean = await this.page.locator('a[@class="page-link"]')? true: false
        let productName: string = await this.page.locator(this.withDiscount + "/../../../../../div//div[contains(@class,'product_name')]").nth(randomProductNumber).innerText()
        let productPrice: string = await this.page.locator(this.withDiscount + "/../../../../../div/div[2]//span[contains(@class,'product_price')]").nth(randomProductNumber).innerText()
        let productPriceValue: string = productPrice.split(' ')[0]
        await this.addProduct(this.withDiscount,randomProductNumber)
        await this.miniCart.openMiniCart()
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)
    }


    
}  
