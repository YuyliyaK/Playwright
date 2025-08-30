import { Page, expect } from "@playwright/test";

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
}