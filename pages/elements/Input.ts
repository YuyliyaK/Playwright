import { BasePage } from "../BasePage";
import type { Locator } from "@playwright/test";

export class Input extends BasePage{
    elem : Locator;
    constructor(page, elem){
        super(page)
        this.elem = elem
    }

    async clickInput(){
        await this.elem.click()
    }
}