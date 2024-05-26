import { type Page } from "@playwright/test";

export class MainPage {

  constructor(private _root: Page) { }

  filters = this._root.locator("#newFiltersParent");

  async open() {
    await this._root.goto("/beta/en/casino/lobby");
    return this;
  }

  async toggleFilter() {
    await this._root.locator("#filters-button").click();
  }
}