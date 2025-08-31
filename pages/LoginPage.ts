import { BasePage } from "./BasePage";
import { expect, Locator } from "@playwright/test";
import { validCredential } from "../test-data/parameters";

export class LoginPage extends BasePage{
    constructor(page){
        super(page);
    
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

    async fillLoginPage(loginValue: string = validCredential.username,passValue:string = validCredential.password){
        await this.basePageClick('#loginform-username')
        await this.basePageFill('#loginform-username',loginValue)
        await this.basePageClick('//input[@type="password"]')
        await this.basePageFill('//input[@type="password"]',passValue)
    }

    async rememberUser(){

    }
}