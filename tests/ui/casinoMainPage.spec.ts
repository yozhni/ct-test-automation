import { expect, test } from "@playwright/test";
import { BaseCasinoPage } from "../../pages/BaseCasino.page";
import data from "../../test-data/AtributesFilterValues.json";

let filterValues: string[] = data.mainPageFilters;

filterValues.forEach((filterValue: string) => {
  test(`Verify the new filter on main Casino page is clickable and filtered by Attribute '${filterValue}' `, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.filterByNewFilterByButton(filterValue);
  });
});
