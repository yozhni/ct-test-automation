import {Locator, Page, expect, test} from "@playwright/test"

export class BaseCasinoPage{ 

    private readonly page: Page;

    constructor(page:Page) { 
        this.page = page;
    }

//locators 
    protected getLocatorPopupFilterButton():Locator {
        return this.page.locator("xpath=//button[@id='filters-button' and contains(@class, 'filters-button')]");
    }

    protected getLocatorPopupFilterPageVisible(): Locator { 
        return this.page.locator("xpath=//div[contains(@class,'translate-x-0')]");
    }


//methods
    async openCasinoBaseURL() { 
        //await this.page.goto('https://www.cloudbet.com/beta/en/casino/lobby');
        await this.page.goto('/beta/casino/lobby');
    }

    async openPopupFilterPage() { 
        await this.getLocatorPopupFilterButton().click();
}

    async expectPopupFiltersPageIsVisible() { 
        
        await this.getLocatorPopupFilterPageVisible().click();
        }

}
