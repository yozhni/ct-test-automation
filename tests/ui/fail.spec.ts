import test, { expect } from "@playwright/test";
import { FilterPage } from "../../ui_pages/filter/FilterPage";
import { MainPage } from "../../ui_pages/main/MainPage";
import { AttributesFilter } from "../../ui_pages/filter/AttributesFilter";
import FailTestData from "../../test-data/failTest.json";

test("it should fail", async ({ page }) => {
  const attributes = FailTestData.failAttributes;
  const mainPage: MainPage = new MainPage(page);
  const filterPage: FilterPage = new FilterPage(page);

  await test.step("open main page", async () => {
    await mainPage.open();
  });

  await test.step("filter by Incorrect Attribute", async () => {
    await mainPage.toggleFilter();
    const attributesFilter: AttributesFilter = filterPage.attributes();

    for (const attribute of attributes) {
      const filterItem = await attributesFilter.getByName(attribute);
      await filterItem.toggle();
      await filterItem.expectToggled();
    }
    await filterPage.seeResults();
  });

  await test.step("check search results", async () => {
    for (const attribute of attributes) {
      const filterItem = await mainPage.getFilterByName(attribute);
      await filterItem.expectToggled();
    }
  });
});
