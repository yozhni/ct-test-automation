import { Locator, Page, expect, test } from "@playwright/test";
import { BaseCasinoPage } from "./BaseCasino.page";

export class CasinoPopupFiterPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getLocatorPopupFilterPage(): Locator {
    return this.page.locator(
      "//div[contains(@class,'translate-x-0')]//div/child::div"
    );
  }

  protected getLocatorClosePopupFilter(): Locator {
    const currentLocator: Locator = this.getLocatorPopupFilterPage().locator(
      "span",
      {
        hasText: "Close panel",
      }
    );
    return currentLocator;
  }

  protected getLocatorSeeResultsPopupPage(): Locator {
    return this.page.locator(
      `//button[contains(text(),'results') and contains(@class,'bg-primar')]`
    );
  }

  protected getLocatorClearAllPopupPage(): Locator {
    return this.page.getByRole("button", { name: "Clear All" });
  }

  protected getLocatorFilterByAttributesOnPopupPage(
    attributeName: string
  ): Locator {
    return this.page.locator(
      `//div[contains(@class,'translate-x-0')]//div/child::div//button//div[text()='${attributeName}']`
    );
  }

  protected getLocatorStudioNameOnPopupPage(): Locator {
    return this.page.locator(`//label[text()='Studio Name']`);
  }

  protected getLocatorStudioNameSortButton(): Locator {
    return this.page.locator(
      `//label[text()='Studio Name']/parent::div/child::button//div[1]`
    );
  }

  protected getLocatorFilterByStudioName(studioName: string): Locator {
    return this.page.locator(
      `//li[contains(@id,'headlessui-listbox-option')]//div//div[text()='${studioName}']`
    );
  }

  protected getLocatorNumberOfGamesForSelectedStudio(
    studioName: string
  ): Locator {
    return this.page.locator(
      `//li[contains(@id,'headlessui-listbox-option')]//div//div[text()='${studioName}']/following::div[@class='text-on-surface/30 text-xs'][1]`
    );
  }

  protected getLocatorByStudioNameViewMoreLess(setLessOrMore: string): Locator {
    return this.page.locator(
      `//label[text()='Studio Name']/parent::div/following-sibling::ul/descendant::span[text()='Show ${setLessOrMore}']`
    );
  }

  protected getLocatorParentOfStudioName(studioName: string): Locator {
    return this.page.locator(
      `//li[contains(@id,'headlessui-listbox-option')]//div//div[text()='${studioName}']/parent::div/parent::li`
    );
  }

  //methods

  async closePopupFilter() {
    const closeButton = this.getLocatorClosePopupFilter();
    await closeButton.click();
  }

  async filterByAttributes(attributeName: string) {
    const atributeFilterButton =
      this.getLocatorFilterByAttributesOnPopupPage(attributeName);
    await atributeFilterButton.click();
  }

  async checkClearAllIsVisibleOnPopupFilter() {
    await expect(this.getLocatorClearAllPopupPage()).toBeVisible();
  }

  async checkClearAllIsHiddebOnPopupFilter() {
    await expect(this.getLocatorClearAllPopupPage()).toBeHidden();
  }

  async clickOnClearAllButton() {
    await this.getLocatorClearAllPopupPage().click();
  }

  async checkSeeResultsIsVisibleOnPopupFilter() {
    await expect(this.getLocatorSeeResultsPopupPage()).toBeVisible();
  }

  async checkSeeResultsIsHiddedOnPopupFilter() {
    await expect(this.getLocatorSeeResultsPopupPage()).toBeHidden();
  }

  async clickOnSeeTestResultsButton() {
    await this.getLocatorSeeResultsPopupPage().click();
  }

  async checkStudioNameIsDisplayed() {
    await expect(this.getLocatorStudioNameOnPopupPage()).toBeVisible;
  }

  async checkDefaultSortValueOfStudioName(defaultValue: string) {
    await this.getLocatorStudioNameSortButton().waitFor();
    await expect(this.getLocatorStudioNameSortButton()).toHaveText(
      defaultValue
    );
  }

  async checkDefaultViewValueOfStudioName(defaultValue: string) {
    await expect(
      this.getLocatorByStudioNameViewMoreLess(defaultValue)
    ).toBeVisible();
  }

  async filterByStudioName(studioName: string) {
    await this.getLocatorFilterByStudioName(
      studioName
    ).scrollIntoViewIfNeeded();
    await this.getLocatorFilterByStudioName(studioName).click();
  }

  async checkStudioNameIsSelected(studioName: string, expectedValue: string) {
    const valueOfSelected = await this.getLocatorParentOfStudioName(
      studioName
    ).getAttribute("aria-selected");
    expect(valueOfSelected).toEqual(expectedValue);
  }

  async selectLessOrMoreStudioNames(setLessOrMore: string) {
    await this.getLocatorByStudioNameViewMoreLess(setLessOrMore).click();
  }

  async extractNumberOfGamesForStudioName(studioName: string) {
    const seeResultValue = await this.getLocatorNumberOfGamesForSelectedStudio(
      studioName
    ).textContent();
    return seeResultValue;
  }

  async extractNumbeFromSeeResults() {
    const seeRusultsNumber =
      await this.getLocatorSeeResultsPopupPage().textContent();
    return seeRusultsNumber != "No results"
      ? seeRusultsNumber?.split(" ")[1]
      : "No results";
  }

  async checkNumberOfGamesInSeeResultsIsSameWithStudioNameNumberOfGames(
    studioName: string
  ) {
    let sumOfTestResults = 0;
    const seeResultsNumber = await this.extractNumbeFromSeeResults();
    const studionumberOfGames = await this.extractNumberOfGamesForStudioName(
      studioName
    );

    expect(seeResultsNumber).toEqual(studionumberOfGames);
  }

  async changeSortOrderForStudioName() {
    const sortValueBeforeClick =
      await this.getLocatorStudioNameSortButton().textContent();
    const expectedSortValue =
      sortValueBeforeClick === "Recommended" ? "A-Z" : "Recommended";
    await this.getLocatorStudioNameSortButton().click();
    await this.page.waitForTimeout(2000);
    const sortValueAfterClick =
      await this.getLocatorStudioNameSortButton().textContent();
    expect(sortValueAfterClick).toEqual(expectedSortValue);
  }
}
