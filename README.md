# ct-test-automation

## setup

1. Install node.js
2. Install framework by running `npm install`
3. Install browsers set for playwright by running `npx playwright install`

## set env

Set env value in .env
(now all envs are looking at same link)

Values to select in Filter can be chaged in ../../test-data/filtersValues.json

## run

to run under all available browsers:
`npx playwright test`

to run under spesific browser:

`npx playwright test --project=chromium`

`npx playwright test --project=firefox`

please mind the webkit project is disabled as it's buggy and needs extra time to investigate

actions job now running all of test cases under chromium and firefox

## view report

link to report can be copied from Actions page from run:
<img width="1007" alt="Screenshot 2024-05-26 at 5 01 26 PM" src="https://github.com/yozhni/ct-test-automation/assets/85211615/b6228f9f-b45a-41c2-9489-47fc1bdb93a9">

please note I'm using free account for report portal, so I need to update api key every day to use direct link to report OOTB

also, please, mind the report should be refreshed daily as it's using free report portal account

html report is awailable for download without limits from Actions

## things to improve

1. add test cases to cover rest of filter groups (like "verify the selected filtes are moving forward")
2. add mobile devices mode
3. move extruction of test data away from test cases
4. improve report
