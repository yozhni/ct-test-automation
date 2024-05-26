import { type Locator, type Page } from "@playwright/test";
import { CheckBoxFilter } from "./CheckBoxFilter";

export class FilterPage {
  _root: Locator;

  constructor(mainPage: Page) {
    this._root = mainPage.locator("div.filters-overlay");
  }

  private _seeResultsButton(): Locator {
    return this._root.locator("button.bg-primary");
  }

  public studios(): CheckBoxFilter {
    return new CheckBoxFilter(
      this._root.filter({ hasText: "Studio Name" }));
  }

  public themes(): CheckBoxFilter {
    return new CheckBoxFilter(
      this._root.filter({ hasText: "Themes" }));
  }

  public async seeResults() {
    await this._seeResultsButton().click();
  }

  public async getResultsCount(): Promise<number> {
    return 0;  
  }
}