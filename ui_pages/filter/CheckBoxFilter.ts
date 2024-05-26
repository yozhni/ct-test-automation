import { expect, type Locator, type Page } from "@playwright/test";

export interface CheckBoxFilterItem {
  expectToggled(): Promise<void>;
  expectUnToggled(): Promise<void>;
  toggle(): Promise<void>;
  count(): Promise<number>;
}

export class CheckBoxFilter {
  private _root: Locator;

  private ITEM_SELECTOR = "ul>div>div>div";

  constructor(locator: Locator) {
    this._root = locator;
  }

  async showMore() {
    await this._root.locator("button", { hasText: /Show More/ }).click();
  }

  async showLess() {
    await this._root.locator("button", { hasText: /Show Less/ }).click();
  }

  async getByName(name: string): Promise<CheckBoxFilterItem> {   
    const element = this._root.locator(this.ITEM_SELECTOR, {
      hasText: name
    });

    let expectToggled = async () => {
      await expect(element).toHaveClass(/order-0/);
    }

    let expectUnToggled = async () => {
      await expect(element).toHaveClass(/order-1/);
    }

    let toggle = async () => {
      await element.locator("li").click();
    }

    let count = async () => {
      const countText = await element.locator("div.text-xs").textContent();
      return (countText) ? parseInt(countText!.trim()) : 0;
    }

    return {
      expectToggled,
      expectUnToggled,
      toggle,
      count
    };
  }
}