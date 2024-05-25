import { Locator, Page, expect, test } from "@playwright/test";

export class BaseCasinoPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //locators
  protected getLocatorPopupFilterButton(): Locator {
    return this.page.locator(
      "//button[@id='filters-button' and contains(@class, 'filters-button')]"
    );
  }

  protected getLocatorNewFilterButton(buttonNmae: string): Locator {
    return this.page.locator(
      `//descendant::div[@id='newFiltersContainer']//button//div[text()='${buttonNmae}']`
    );
  }

  protected getLocatorSearchResults(): Locator {
    return this.page.locator(
      `//span[text()='Search Results']/following-sibling::span`
    );
  }

  //methods

  /**
   * method to open casino URL
   */
  async openCasinoBaseURL() {
    await this.page.goto("/beta/en/casino/lobby");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openPopupFilterPage() {
    const openPopupFilterButton: Locator = this.getLocatorPopupFilterButton();
    await openPopupFilterButton.waitFor();
    await openPopupFilterButton.click();
  }

  async filterByNewFilterByButton(buttonName: string) {
    const filterButton = this.getLocatorNewFilterButton(buttonName);
    await filterButton.scrollIntoViewIfNeeded();
    await filterButton.click();
  }

  async waitForSearchResultsAreLoaded() {
    await this.getLocatorSearchResults().waitFor();
    await this.getLocatorSearchResults().click();
  }

  async extractSearchResultValue() {
    const searchResultValue =
      await this.getLocatorSearchResults().textContent();
    return searchResultValue;
  }
}
