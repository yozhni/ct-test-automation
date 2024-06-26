import { type Locator, type Page } from "@playwright/test";
import { CheckBoxFilter } from "./CheckBoxFilter";
import { AttributesFilter } from "./AttributesFilter";

export class FilterPage {
  _root: Locator;

  constructor(mainPage: Page) {
    this._root = mainPage.locator("div.filters-overlay");
  }

  private get _seeResultsButton(): Locator {
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

  public attributes():AttributesFilter {
    const locators = this._root.locator("div>div").filter({ hasText: "Attributes"});
    const locator = locators.last();
    return new AttributesFilter(locator);
  }

  public async seeResults() {
    await this._seeResultsButton.click();
  }

  public async getResultsCount(): Promise<number> {
    let countText = await this._seeResultsButton.textContent();
    if (!countText) {
      return 0;
    }
    countText = /(\d+)/.exec(countText!)![0];
    return parseInt(countText);
  }
}