import { Locator, expect } from "@playwright/test";

export interface AttributeFilterItem {
  toggle(): Promise<void>;
  expectToggled(): Promise<void>;
}

export class AttributesFilter {
  constructor(private _root: Locator) {
  }

  async getScreenshot(): Promise<void> {
    await this._root.screenshot({ path: "AttributesFilter.png" });
  }

  async getByName(name: string): Promise<AttributeFilterItem> {
    const element = this._root.locator("button").filter({ hasText: name });

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