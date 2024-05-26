import { expect, type Page } from "@playwright/test";
import { AttributeFilterItem } from "../filter/AttributesFilter";

export class MainPage {

  constructor(private _root: Page) { }

  private _filters = this._root.locator("#newFiltersParent");

  async open() {
    await this._root.goto("/beta/en/casino/lobby");
    return this;
  }

  async toggleFilter() {
    await this._root.locator("#filters-button").click();
  }
  
  async getFilterByName(name: string): Promise<AttributeFilterItem> {
    const element = this._filters.locator("button").filter({ hasText: name });

    return {
      toggle: async () => {
        await element.click();
      },
      expectToggled: async () => {
        const textDiv = element.locator("div.text-xs");
        await expect(textDiv).toHaveClass(/text-primary-lighter/);
      }
    }
  }
}