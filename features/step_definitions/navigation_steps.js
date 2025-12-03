const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const pageManager = require('../../pages/PageManager');

// Set default timeout to 30 seconds for all steps
setDefaultTimeout(30 * 1000);

let examplePage;

When('I wait for the page to load', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  await examplePage.waitForLoad('networkidle');
});

Then('the page should be loaded successfully', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  const url = examplePage.getUrl();
  expect(url).toBeTruthy();
});

When('I check the page content', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  await examplePage.waitForDOMContent();
});

Then('the page should contain {string}', { timeout: 30 * 1000 }, async function (expectedText) {
  examplePage = pageManager.getExamplePage();
  const containsText = await examplePage.containsText(expectedText);
  expect(containsText).toBe(true);
});

