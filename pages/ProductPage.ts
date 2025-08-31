import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { validCredential } from "../test-data/parameters";

export class ProoductPage extends BasePage{

    constructor(page){
        super(page);
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
}