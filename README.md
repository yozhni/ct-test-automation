# ct-test-automation


## setup
1. Install node
2. Install framework by running `npm install`
3. Install browsers set for playwright by running `npx playwright install`

## set env
Set env value in .env
(now all envs are looking at same link)

## run 
to run under all browsers:
```npx playwright test``` 

to run under spesific browser:
```npx playwright test --project=chromium #webkit #firefox```

actions job now running all of test cases under all of the browsers

## view report 
please note I'm using free account for report portal, so I need to update api key every day to use direct link to report
also, please, mind the report should be refreshed daily as it's using free report portal account
html report is awailable for download without limits from Actions

## things to improve
1. split CasinoPopupFilter.page.ts by filters groups for convinient use
2. add test cases to cover rest of filter groups
3. add mobile devices testing
4. move extruction of test data away from test cases
5. to improve test cases performance it's posible to move initialisation actions in config
6. to improve report usability 
