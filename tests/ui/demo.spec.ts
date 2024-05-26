import test, { expect } from "@playwright/test";
import { BaseCasinoPage } from "../../pages/BaseCasino.page";
import { FilterPage } from "../../ui/filter/FilterPage";
import { MainPage } from "../../ui/main/MainPage";

test.describe("smoke tests", () => {

  // test("1", async({page}) => {
  //   await page.waitForTimeout(5000);
  // });
  // test("2", async({page}) => {
  //   await page.waitForTimeout(5000);
  // });
  // test("3", async({page}) => {
  //   await page.waitForTimeout(5000);
  // });
  // test("4", async({page}) => {
  //   await page.waitForTimeout(5000);
  // });


  test("it should filter by studios", async ({ page }) => {

    const studios = ["Vivo", "Playtech", "Atomic Slot Lab"]
    const mainPage: MainPage = new MainPage(page);
    const filterPage: FilterPage = new FilterPage(page);

    await test.step("open main page", async () => {
      await mainPage.open();
    });

    await test.step("filter by studios", async () => {
      await mainPage.toggleFilter();
      let total:number = 0;

      for (const studio of studios) {
        const filterItem = await filterPage.studios().getByName(studio);
        await filterItem.expectUnToggled();
        await filterItem.toggle();
        await filterItem.expectToggled();
        
        const filterCount = await filterItem.count();
        total += filterCount;
      }
      
      console.log(`total: ${total}`);

      expect(total).toEqual(await filterPage.getResultsCount());

    });

    await test.step("check filter results count", async () => {

    });

    await test.step("click 'See results'", async () => {
      await filterPage.seeResults();
    });

    await test.step("check search results", async () => {
      for (const studio of studios) {
        await expect(mainPage.filters).toHaveText(new RegExp(studio));
      }
    });
  });
});
