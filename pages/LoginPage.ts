import { BasePage } from "./BasePage";
import { expect} from "@playwright/test";
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
        await this.basePageType('#loginform-username',loginValue)
        await this.basePageClick('//input[@type="password"]')
        await this.basePageType('//input[@type="password"]',passValue)
        await expect(this.page.locator('button:has-text("Вход")')).not.toHaveAttribute('disabled'); //.setAttribute('isClicked', 'true');
    }

    async rememberUser(){
       await this.click_checkBox('#loginform-rememberme')
    }
    async randomRememberUser(){
        let randomNumber: number = Math.ceil(Math.random()*2)
        //console.log(randomNumber)
        if (randomNumber == 1){
           await this.rememberUser()
        }

    }

    async pressSubmit(){
        await this.basePageClick('button:has-text("Вход")')
    }


    async authenticationUser(){
        await this.openLoginPage()
        await this.fillLoginPage()
        await this.pressSubmit()

    }
}