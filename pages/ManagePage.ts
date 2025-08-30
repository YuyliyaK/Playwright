import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export default class ManagePage{
    constructor(private readonly page: Page) { }
    
    private _login?: LoginPage;

    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }
    
}