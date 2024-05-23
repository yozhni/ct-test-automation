import { Locator, Page, expect, test } from "@playwright/test";

export class BaseCasinoPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  protected getLocatorPopupFilterButton(): Locator {
    return this.page.locator(
      "xpath=//button[@id='filters-button' and contains(@class, 'filters-button')]"
    );
  }

  protected getLocatorPopupFilterPage(): Locator {
    return this.page.locator("xpath=//div[contains(@class,'translate-x-0')]");
  }

  protected getLocatorNewFilterButton(buttonNmae: string): Locator {
    return this.page.locator(
      `xpath=//descendant::div[@id='newFiltersContainer']//button//div[text()='${buttonNmae}']`
    );
  }

  
  //methods

  /**
   * method to open casino URL
   */
  async openCasinoBaseURL() {
    await this.page.goto("/beta/en/casino/lobby");
    await this.page.waitForLoadState();
  }

  async openPopupFilterPage() {
    const openPopupFilterButton: Locator = this.getLocatorPopupFilterButton();
    await openPopupFilterButton.waitFor();
    await openPopupFilterButton.click();
  }

  async expectPopupFiltersPageIsVisible() {
    const popupFilterPage = this.getLocatorPopupFilterPage();
    await popupFilterPage.waitFor();
    await popupFilterPage.click();
  }

  async filterByNewFilterByButton(buttonName: string) {
    const filterButton = this.getLocatorNewFilterButton(buttonName);
    await filterButton.scrollIntoViewIfNeeded();
    await filterButton.click();
  }
}
