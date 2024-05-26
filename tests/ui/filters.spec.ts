import test, { expect } from "@playwright/test";
import { FilterPage } from "../../ui/filter/FilterPage";
import { MainPage } from "../../ui/main/MainPage";
import { AttributesFilter } from "../../ui/filter/AttributesFilter";

test.describe("Filter Tests", () => {

  test("it should filter by studios", async ({ page }) => {

    const studios = ["Vivo", "Playtech", "Atomic Slot Lab"]
    const mainPage: MainPage = new MainPage(page);
    const filterPage: FilterPage = new FilterPage(page);

    await test.step("open main page", async () => {
      await mainPage.open();
    });

    await test.step("filter by Studios", async () => {
      let total: number = 0;

      await mainPage.toggleFilter();
      for (const studio of studios) {
        const filterItem = await filterPage.studios().getByName(studio);
        await filterItem.expectUnToggled();
        await filterItem.toggle();
        await filterItem.expectToggled();

        const filterCount = await filterItem.count();
        console.log(`studio ${studio}: ${filterCount}`);
        total += filterCount;
      }

      console.log(`expected studios total: ${total}`);
      expect(await filterPage.getResultsCount()).toEqual(total);

    });

    await test.step("click 'See results'", async () => {
      await filterPage.seeResults();
    });

    await test.step("check search results", async () => {
      for (const studio of studios) {
        await (await mainPage.getFilterByName(studio)).expectToggled();
      }
    });
  });

  test("it should filter by Themes", async ({ page }) => {

    const themes = ["Egyptian", "Sea", "Space"]
    const mainPage: MainPage = new MainPage(page);
    const filterPage: FilterPage = new FilterPage(page);

    await test.step("open main page", async () => {
      await mainPage.open();
    });

    await test.step("filter by themes", async () => {
      let total: number = 0;

      await mainPage.toggleFilter();
      for (const theme of themes) {
        const filterItem = await filterPage.themes().getByName(theme);
        await filterItem.expectUnToggled();
        await filterItem.toggle();
        await filterItem.expectToggled();

        const filterCount = await filterItem.count();
        console.log(`theme ${theme}: ${filterCount}`);
        total += filterCount;
      }

      console.log(`expected themes total: ${total}`);
      expect(await filterPage.getResultsCount()).toEqual(total);

    });

    await test.step("click 'See results'", async () => {
      await filterPage.seeResults();
    });

    await test.step("check search results", async () => {
      for (const theme of themes) {
        await (await mainPage.getFilterByName(theme)).expectToggled();
      }
    });
  });

  test("it should filter by Attributes", async ({ page }) => {
    const attributes = ["Hot", "Trending", "Auto Play"]
    const mainPage: MainPage = new MainPage(page);
    const filterPage: FilterPage = new FilterPage(page);

    await test.step("open main page", async () => {
      await mainPage.open();
    });

    await test.step("filter by Attributes", async () => {
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
});
