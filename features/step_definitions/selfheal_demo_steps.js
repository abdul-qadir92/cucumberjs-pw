const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const browserContext = require('../support/browser_context');
const pageManager = require('../../pages/PageManager');

setDefaultTimeout(30 * 1000);

Then('the page title should match {string}', { timeout: 30 * 1000 }, async function (expectedTitle) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const title = await selfHealPage.getTitle();
  expect(title).toMatch(new RegExp(expectedTitle));
});

When('I toggle the self-heal demo feature', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.toggleSelfHealDemo();
});

When('I click {string}', { timeout: 30 * 1000 }, async function (buttonText) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  if (buttonText === 'Try Demo Scenarios') {
    await selfHealPage.clickTryDemoScenarios();
  } else {
    throw new Error(`Unknown button: ${buttonText}`);
  }
});

When('I fill the static ID field with {string}', { timeout: 30 * 1000 }, async function (text) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.fillStaticIdField(text);
});

When('I fill the xpath field with {string}', { timeout: 30 * 1000 }, async function (text) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.fillXpathField(text);
});

When('I click the Submit button', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickSubmit();
});

When('I click the Proceed button', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProceed();
});

When('I click the feature toggle', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickFeatureToggle();
});

Then('the progress status should be {string}', { timeout: 30 * 1000 }, async function (expectedStatus) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const statusText = await selfHealPage.getProgressStatusText();
  expect(statusText).toContain(expectedStatus);
});

When('I click the progress complete button', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProgressComplete();
});

When('I click the Profile button', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProfile();
});

When('I select the second user and sign in', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.loginAsUser();
});

When('I add products 1, 2, 3 and 9 to cart', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.addProductsToCart();
});

When('I go to the shopping cart', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.shoppingCartBtn.click();
});

Then('the cart should contain {int} items', { timeout: 30 * 1000 }, async function (expectedCount) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const count = await selfHealPage.getCartItemsCount();
  expect(count).toBe(expectedCount);
});

When('I proceed to checkout and place the order', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.checkout();
});

When('I view the invoice for the first order', { timeout: 30 * 1000 }, async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.viewFirstOrderInvoice();
});

Then('the invoice should be displayed', { timeout: 30 * 1000 }, async function () {
  const page = browserContext.getPage();
  await expect(page.getByRole('heading', { name: /Invoice for Order/ })).toBeVisible({ timeout: 30000 });
});
