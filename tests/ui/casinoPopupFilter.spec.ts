import { expect, test } from "@playwright/test";
import { CasinoPopupFiterPage } from "../../pages/CasinoPopupFilter.page";
import { BaseCasinoPage } from "../../pages/BaseCasino.page";
import atributesData from "../../test-data/AtributesFilterValues.json";
import studioNamesData from "../../test-data/StudioNameFilterValues.json";
import mixedfiltesData from "../../test-data/MixedFilterValues.json";

test.describe("Veriry the games filter by Attributes.", () => {
  let attributes: string[] = atributesData.popupFilters;
  let sameAttributes: string[] = atributesData.sameFilters;
  let mixAttributes: string[] = atributesData.mixAttributes;

  attributes.forEach((attribute: string) => {
    test(`Filter by Atribute '${attribute}' and check the search results are displayed correctly on main page`, async ({
      page,
    }) => {
      const baseCasinoPage = new BaseCasinoPage(page);
      const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
      await baseCasinoPage.openCasinoBaseURL();
      await baseCasinoPage.openPopupFilterPage();
      await casinoPopupFiterPage.checkClearAllIsHiddebOnPopupFilter();
      await casinoPopupFiterPage.checkSeeResultsIsHiddedOnPopupFilter();
      await casinoPopupFiterPage.filterByAttributes(attribute);
      await casinoPopupFiterPage.clickOnSeeTestResultsButton();
      await baseCasinoPage.waitForSearchResultsAreLoaded();
      expect(await baseCasinoPage.extractSearchResultValue()).toEqual(
        await casinoPopupFiterPage.extractNumbeFromSeeResults()
      );
    });
  });

  test(`Filter by several Attribute: ${sameAttributes.join(
    ", "
  )}. Clear filter by 'Clear all' button. Check the FIlter view is correct.`, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
    await casinoPopupFiterPage.checkClearAllIsHiddebOnPopupFilter();
    await casinoPopupFiterPage.checkSeeResultsIsHiddedOnPopupFilter();
    for (const attribute of mixAttributes) {
      await casinoPopupFiterPage.filterByAttributes(attribute);
    }
    await casinoPopupFiterPage.clickOnSeeTestResultsButton();
    await baseCasinoPage.waitForSearchResultsAreLoaded();
    await baseCasinoPage.openPopupFilterPage();
    await casinoPopupFiterPage.checkClearAllIsVisibleOnPopupFilter();
    await casinoPopupFiterPage.clickOnClearAllButton();
    await casinoPopupFiterPage.checkClearAllIsHiddebOnPopupFilter();
    await casinoPopupFiterPage.checkSeeResultsIsHiddedOnPopupFilter();
    await casinoPopupFiterPage.closePopupFilter();
  });

  sameAttributes.forEach((sameAttribute: string) => {
    test(`Filter by Attributes ${sameAttribute} and clear filter by clicking same button on main page`, async ({
      page,
    }) => {
      const baseCasinoPage = new BaseCasinoPage(page);
      const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
      await baseCasinoPage.openCasinoBaseURL();
      await baseCasinoPage.openPopupFilterPage();
      await casinoPopupFiterPage.checkClearAllIsHiddebOnPopupFilter();
      await casinoPopupFiterPage.checkSeeResultsIsHiddedOnPopupFilter();
      await casinoPopupFiterPage.filterByAttributes(sameAttribute);
      await casinoPopupFiterPage.clickOnSeeTestResultsButton();
      await baseCasinoPage.waitForSearchResultsAreLoaded();
      await baseCasinoPage.filterByNewFilterByButton(sameAttribute);
      await baseCasinoPage.openPopupFilterPage();
      await casinoPopupFiterPage.checkClearAllIsHiddebOnPopupFilter();
      await casinoPopupFiterPage.checkSeeResultsIsVisibleOnPopupFilter();
      await casinoPopupFiterPage.closePopupFilter();
    });
  });
});

test.describe("Verify filter by Studio Name", () => {
  let studioNames: string[] = studioNamesData.studioNames;
  let studioNamesDefaultSort: string = studioNamesData.defaultSort;
  let studioNamesDefaultView: string = studioNamesData.defaultView;
  let studioNameToTestAtOnce: string[] =
    studioNamesData.studioNamesToTestSeveralStudioNamesAtOnce;

  test(`Verify default sort is ${studioNamesDefaultSort}. Defualt view is' View ${studioNamesDefaultView}`, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
    await casinoPopupFiterPage.checkStudioNameIsDisplayed();
    await casinoPopupFiterPage.checkDefaultSortValueOfStudioName(
      studioNamesDefaultSort
    );
    await casinoPopupFiterPage.checkDefaultViewValueOfStudioName(
      studioNamesDefaultView
    );
    await casinoPopupFiterPage.closePopupFilter();
  });

  studioNames.forEach((studioName: string) => {
    test(`View more Studio name values. Filter by Studio Name '${studioName}' . Check the 'See Results" has a correct value`, async ({
      page,
    }) => {
      const baseCasinoPage = new BaseCasinoPage(page);
      const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
      await baseCasinoPage.openCasinoBaseURL();
      await baseCasinoPage.openPopupFilterPage();
      await casinoPopupFiterPage.checkStudioNameIsDisplayed();
      await casinoPopupFiterPage.selectLessOrMoreStudioNames("More");
      await casinoPopupFiterPage.filterByStudioName(studioName);
      await casinoPopupFiterPage.checkStudioNameIsSelected(studioName, "true");
      await casinoPopupFiterPage.checkNumberOfGamesInSeeResultsIsSameWithStudioNameNumberOfGames(
        studioName
      );
    });
  });

  test(`Change sort order of Studio names. 
  Select to display More Studio Names.
  Filter by several Studio names ${studioNameToTestAtOnce.join(", ")}.
  Select to display Less Studio names .
  Click the 'See Results", check search results are displayed correctly on main page `, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
    await casinoPopupFiterPage.checkStudioNameIsDisplayed();
    await casinoPopupFiterPage.changeSortOrderForStudioName();
    await casinoPopupFiterPage.selectLessOrMoreStudioNames("More");
    for (const studioName of studioNameToTestAtOnce) {
      await casinoPopupFiterPage.filterByStudioName(studioName);
    }
    await casinoPopupFiterPage.selectLessOrMoreStudioNames("Less");
    await casinoPopupFiterPage.clickOnSeeTestResultsButton();
    await baseCasinoPage.waitForSearchResultsAreLoaded();
    expect(await baseCasinoPage.extractSearchResultValue()).toEqual(
      await casinoPopupFiterPage.extractNumbeFromSeeResults()
    );
  });
});

test.describe("Verify filter by several groups of Field: ", () => {
  let attributesNoSearchResults: string[] =
    mixedfiltesData.NoSearchResults.attributes;
  let studioNamesNoSearchResults: string[] =
    mixedfiltesData.NoSearchResults.studioNames;

  test(`By Atributes: ${attributesNoSearchResults.join(
    ", "
  )}. By Studio names: ${studioNamesNoSearchResults.join(
    ", "
  )}. Verify there are No search results. `, async ({ page }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
    for (const attribute of attributesNoSearchResults) {
      await casinoPopupFiterPage.filterByAttributes(attribute);
    }
    for (const studioName of studioNamesNoSearchResults) {
      await casinoPopupFiterPage.filterByStudioName(studioName);
    }
    expect(await casinoPopupFiterPage.extractNumbeFromSeeResults()).toEqual(
      "No results"
    );
  });

  let attributesMixSearchResults: string[] =
    mixedfiltesData.TestresultsWithSearchResults.attributes;
  let studioNamesMixSearchResults: string[] =
    mixedfiltesData.TestresultsWithSearchResults.studioNames;

  test(`By Atributes: ${attributesMixSearchResults.join(
    ", "
  )}. By Studio names: ${studioNamesMixSearchResults.join(
    ", "
  )}. Click the 'See Results", check search results are displayed correctly on main page `, async ({
    page,
  }) => {
    const baseCasinoPage = new BaseCasinoPage(page);
    const casinoPopupFiterPage = new CasinoPopupFiterPage(page);
    await baseCasinoPage.openCasinoBaseURL();
    await baseCasinoPage.openPopupFilterPage();
    for (const attribute of attributesMixSearchResults) {
      await casinoPopupFiterPage.filterByAttributes(attribute);
    }
    for (const studioName of studioNamesMixSearchResults) {
      await casinoPopupFiterPage.filterByStudioName(studioName);
    }
    await casinoPopupFiterPage.clickOnSeeTestResultsButton();
    await baseCasinoPage.waitForSearchResultsAreLoaded();
    expect(await baseCasinoPage.extractSearchResultValue()).toEqual(
      await casinoPopupFiterPage.extractNumbeFromSeeResults()
    );
  });
});
