import { expect, test } from "@playwright/test"
import {BaseCasinoPage} from "../../pages/BaseCasino.page"


test('Verify the popup Filtes page is opened', async ({ page }) => {
    const baseCasinoPage = new BaseCasinoPage(page);

    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
   //await baseCasinoPage.expectPopupFiltersPageIsVisible();
})