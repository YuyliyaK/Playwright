import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { ProoductPage } from "./ProductPage";
import { MiniCartPage } from "./MiniCartPage";

export default class ManagePage{
    constructor(private readonly page: Page) { }
    
    private _login?: LoginPage;
    private _product?: ProoductPage;
    private _miniCart?: MiniCartPage;

    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }

    get productPage(): ProoductPage {
        return this._product ??= new ProoductPage(this.page);
    }
    get miniCartPage(): MiniCartPage {
        return this._miniCart ??= new MiniCartPage(this.page);
    }
    
}