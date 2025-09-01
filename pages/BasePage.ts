import { Page, expect, Locator } from "@playwright/test";

export abstract class BasePage {
    constructor(protected readonly page: Page){}

    protected async openPage(path: string){
        await this.page.goto(path);
    }

    async checkTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }

    
    async checkURL(title: string){
        await expect(this.page).toHaveURL(title)
    }
    protected async basePageClick(selector: string | Locator) {
        await this.toLocator(selector).click();
    }

    protected async basePageFill(selector: string | Locator, value: string) {
        await this.toLocator(selector).fill(value);
    }
    protected async basePageType(selector: string | Locator, value: string) {
        await this.toLocator(selector).type(value);
    }
    protected async check_checkBox(selector: string | Locator){
        await this.toLocator(selector).check();
    }
    protected async uncheck_checkBox(selector: string | Locator){
        await this.toLocator(selector).uncheck();
    } 

    protected async click_checkBox(selector: string | Locator){
        await this.toLocator(selector).click();
    }

    protected async basePageExpectVisible(selector: string | Locator) {
        await expect.soft(this.toLocator(selector)).toBeVisible();
    }

    protected toLocator(selector: string | Locator): Locator {
        return typeof selector === 'string'
        ? this.page.locator(selector)   
        : selector;                     
    }
}