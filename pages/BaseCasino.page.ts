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

    protected getLocatorPopupFilterPage(): Locator { 
        return this.page.locator("xpath=//div[contains(@class,'translate-x-0')]");
    }


//methods
    async openCasinoBaseURL() { 
        //await this.page.goto('https://www.cloudbet.com/beta/en/casino/lobby');
        await this.page.goto('/beta/casino/lobby');
        await this.page.waitForLoadState('load', {timeout:10000});
    }

    async openPopupFilterPage() { 
        const openPopupFilterButton: Locator = this.getLocatorPopupFilterButton();
        await openPopupFilterButton.waitFor();
        await openPopupFilterButton.click();
}

    async expectPopupFiltersPageIsVisible() { 
        
        const popupFilterPage = this.getLocatorPopupFilterPage()
        await popupFilterPage.waitFor();
        await popupFilterPage.click();
        }

}
