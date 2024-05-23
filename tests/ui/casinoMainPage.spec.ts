import { expect, test } from "@playwright/test";
import { BaseCasinoPage } from "../../pages/BaseCasino.page";

let filterValues: string[] = ["Cold", "New"];

filterValues.forEach((filterValue: string) => {
  test(`Verify the new filter on main Csino page is clickable and filtered by Attribute = ${filterValue} `, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.filterByNewFilterByButton(filterValue);
  });
});
