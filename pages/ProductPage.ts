import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { validCredential } from "../test-data/parameters";
import { MiniCartPage } from "./MiniCartPage";
import { stringify } from "querystring";

export class ProoductPage extends BasePage{

    protected withOutDiscount: string
    protected withDiscount: string
    protected miniCart: MiniCartPage
    protected checkDiscount: string
    protected countField: string
    protected productNameText: string
    protected productPriceText: string
    protected addButton: string
    protected productPageCount: number
    protected paginationPage: string
    protected discountWithCountRestriction: string
        
    constructor(page){
        super(page);
        this.withOutDiscount = '//*[@class="ribbon"]/span[not(text())]'
        this.withDiscount ="//span[@class='product_discount'][string-length(text()) > 0]"
        this.checkDiscount = '#gridCheck'
        this.countField = 'input[name="product-enter-count"]'
        this.productNameText = "/../../../../../div//div[contains(@class,'product_name')]"
        this.productPriceText = "/../../../../../div/div[2]//span[contains(@class,'product_price')]"
        this.addButton = "//button[contains(@class,'actionBuyProduct')]"
        this.productPageCount = 8
        this.paginationPage = "//a[@data-page-number]"
        this.discountWithCountRestriction = "//span[contains(@class,'product_count')][text()>"
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

    async getProductInfo(selector: string, property: string, numberProduct: number){
        let propertyValue: string = await this.page.locator(selector + property).nth(numberProduct).innerText()
        return propertyValue
    }
    async getRandomProductNumber(selector: string){
        let allProductCount: number = await this.page.locator(selector).count()
        let randomProductNumber: number = Math.floor(Math.random()*(allProductCount - 1)) 
        return randomProductNumber
    }


    async addSimpleProduct(){
        
        //let allProductCount: number = await this.page.locator(this.withOutDiscount).count()
        let randomProductNumber: number = await this.getRandomProductNumber(this.withOutDiscount)
        let productName: string = await this.getProductInfo(this.withOutDiscount, this.productNameText,randomProductNumber)
        //let productName: string = await this.page.locator(this.withOutDiscount + "/../../../../../div//div[contains(@class,'product_name')]").nth(randomProductNumber).innerText()
        let productPrice: string = await this.getProductInfo(this.withOutDiscount, this.productPriceText,randomProductNumber)
        //string = await this.page.locator(this.withOutDiscount + "/../../../../../div/div[2]//span[contains(@class,'product_price')]").nth(randomProductNumber).innerText()
        let productPriceValue: string = productPrice.split(' ')[0]
        await this.addProduct(this.withOutDiscount,randomProductNumber)
        await this.miniCart.openMiniCart()
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)

    }
    async showOnlyDiscountProduct(){
        await this.check_checkBox(this.checkDiscount)
    }
    async removeOnlyDiscontDisplay(){
        await this.uncheck_checkBox(this.checkDiscount)
    }
    async addLastDiscountProductOnPage(){
        let randomProductNumber: number = await this.getRandomProductNumber(this.withDiscount)
        let productName: string = await this.getProductInfo(this.withDiscount, this.productNameText,randomProductNumber)
        let productPrice: string = await this.getProductInfo(this.withDiscount, this.productPriceText,randomProductNumber)
        let productPriceValue: string = productPrice.split(' ')[0]
        await this.addProduct(this.withDiscount,randomProductNumber)
        await this.miniCart.openMiniCart()
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)
        
    }

    async typeProductQuantity(productNumber: number,productQuantity: number){
        await this.page.locator(this.countField).nth(productNumber).click()
        await this.page.locator(this.countField).nth(productNumber).clear()
        await this.page.locator(this.countField).nth(productNumber).type(''+productQuantity)

    }

    async addDiscountProduct(){    
        let randomNumber: number = Math.ceil(Math.random()*2)
        if (randomNumber == 2){
            await this.showOnlyDiscountProduct()
        }
        let randomProductNumber: number = await this.getRandomProductNumber(this.withDiscount) 
        //let pages: boolean = await this.page.locator('a[@class="page-link"]')? true: false
        let productName: string = await this.getProductInfo(this.withDiscount, this.productNameText,randomProductNumber)
        let productPrice: string = await this.getProductInfo(this.withDiscount, this.productPriceText,randomProductNumber)
        let productPriceValue: string = productPrice.split(' ')[0]
        await this.addProduct(this.withDiscount,randomProductNumber)
        await this.miniCart.openMiniCart()
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)
    }

    async addProductByEnterCount_discont(productQuantity: number){
        let randomProductNumber: number = await this.getRandomProductNumber(this.discountWithCountRestriction+productQuantity+']') 
        let productName: string = await this.getProductInfo(this.withDiscount, this.productNameText,randomProductNumber)
        let productPrice: string = await this.getProductInfo(this.withDiscount, this.productPriceText,randomProductNumber)
        let productPriceValue: string = productPrice.split(' ')[0]
        let randomNumber: number = Math.ceil(Math.random()*2)
        if (randomNumber == 2){
            await this.typeProductQuantity(randomProductNumber,productQuantity)
            await this.addProduct(this.withDiscount,randomProductNumber)
        } else {
            for (let i = 0; i < productQuantity; i++){
                await this.addProduct(this.withDiscount,randomProductNumber)
            }
        }
        await this.miniCart.openMiniCart()
        await this.miniCart.checkAddedProductCount(productQuantity,productName)
        await this.miniCart.checkProductInfo_oneProduct(productName,productPriceValue)
    }

    async addProductByClickOnPage(){
        let allProductCount: number = await this.page.locator(this.addButton).count()
        for (let i = 0; i < allProductCount -1; i++){
            await this.page.locator(this.addButton).nth(i).click()
        }
    }
    
    async addProduct_Exlud(nameAddedProduct: string){
        let allProductCount: number = await this.page.locator(this.addButton).count()
        let currentNameProduct: string
        for (let i = 0; i < allProductCount -1; i++){
            currentNameProduct = await this.page.locator("//div[contains(@class,'product_name')]").nth(i).innerText();
            if (currentNameProduct != nameAddedProduct){
                await this.page.locator(this.addButton).nth(i).click()
            } 
        }
    } 

    async openNextProductPage(numberPage: number){
        await this.page.locator(this.paginationPage).nth(numberPage).click()
    }
    async addGivenProductNumber(productQuantity:number){
        await this.addDiscountProduct()
        await this.page.locator('#dropdownBasket').click()
        let nameAddedProduct: string = await this.miniCart.getAddedProductName_oneProduct();
        let switchNumber: number = productQuantity % this.productPageCount;
        let balanceProduct: number = productQuantity - (this.productPageCount * switchNumber)
        if (productQuantity <= this.productPageCount) {
            await this.addProduct_Exlud(nameAddedProduct)
        } else {
            for (let i = 0; i <balanceProduct; i++){
                await this.addProduct_Exlud(nameAddedProduct)
                if(i != balanceProduct - 1){
                    await this.openNextProductPage(i + 2)
                }
            }
            await this.page.waitForTimeout(1500);
            let fullProductCount: string = await this.miniCart.getAllAddedProductCount()
            if(Number(fullProductCount) != productQuantity){
                let countSuitableProduct: number = await this.page.locator(`//div[contains(@class,'product_name')][not(text()='${nameAddedProduct}')]/../..//div//button`).count()
                let randomProductAddNumber: number = Math.floor(Math.random()*(countSuitableProduct - 1)) 
                this.page.locator(`//div[contains(@class,'product_name')][not(text()='${nameAddedProduct}')]/../..//div//button`).nth(randomProductAddNumber).click()
            }

        }
        // аналог wait
        // await this.basePageClick('#filterSearch')
        // await this.basePageType('#filterSearch',nameAddedProduct)//this.page.locator('input[id="filterSearch"]').type(nameAddedProduct)
    }
    
}  
