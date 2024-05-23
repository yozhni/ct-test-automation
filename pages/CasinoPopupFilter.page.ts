import { Locator, Page, expect, test } from "@playwright/test";
import { BaseCasinoPage } from "./BaseCasino.page";

export class CasinoPopupFiterPage {

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getLocatorFilterByAttributesOnPopupPage(): Locator { 
return this.page.locator(
      `xpath=`
    );
  }
protected getLocatorFilterByStudioNameOnPopupPage(): Locator { 
return this.page.locator(
      `xpath=`
    );}
  protected getLocatorByStudioNameSortValues(): Locator {
return this.page.locator(
      `xpath=`
    ); }
  protected getLocatorByStudioNameViewMoreLess(): Locator { 
return this.page.locator(
      `xpath=`
    );}

  protected getLocatorFilterByVolatilityOnPopupPage(): Locator { 
return this.page.locator(
      `xpath=`
    );}

  protected getLocatorFilterByThemesOnPopupPage(): Locator { 
return this.page.locator(
      `xpath=`
    );}
  protected getLocatorByThemeSort(): Locator { 
return this.page.locator(
      `xpath=`
    );}
  protected getLocatorByThemesViewMoreLess(): Locator {
return this.page.locator(
      `xpath=`
    ); }

  protected getLocatorSeeResultsPopupPage(): Locator { 
return this.page.locator(
      `xpath=`
    );}
  
  protected getLocatorClearAllPopupPage(): Locator {
return this.page.locator(
      `xpath=`
    ); }

}
}


