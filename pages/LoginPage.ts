import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export class LoginPage extends BasePage{
    constructor(page){
        super(page)
    }
    async openLoginPage(){
        let randomNumber: number = Math.ceil(Math.random()*2)
        if (randomNumber == 2){
            await this.openPage('/login')
        } else {
            await this.openPage('')
            await this.page.getByRole('link', { name: 'Вход' }).click();
        }

        await this.checkURL('/login')

    }
}