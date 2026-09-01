const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const browserContext = require('../support/browser_context');
const pageManager = require('../../pages/PageManager');

//setDefaultTimeout(90 * 1000);

Then('the page title should match {string}', async function (expectedTitle) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const title = await selfHealPage.getTitle();
  expect(title).toMatch(new RegExp(expectedTitle));
});

When('I toggle the self-heal demo feature', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.toggleSelfHealDemo();
});

When('I click {string}', async function (buttonText) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  if (buttonText === 'Try Demo Scenarios') {
    await selfHealPage.clickTryDemoScenarios();
  } else {
    throw new Error(`Unknown button: ${buttonText}`);
  }
});

When('I fill the static ID field with {string}', async function (text) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.fillStaticIdField(text);
});

When('I fill the xpath field with {string}', async function (text) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.fillXpathField(text);
});

When('I click the Submit button', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickSubmit();
});

When('I click the Proceed button', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProceed();
});

When('I click the feature toggle', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickFeatureToggle();
});

Then('the progress status should be {string}', async function (expectedStatus) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const statusText = await selfHealPage.getProgressStatusText();
  expect(statusText).toContain(expectedStatus);
});

When('I click the progress complete button', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProgressComplete();
});

When('I click the Profile button', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.clickProfile();
});

When('I select the second user and sign in', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.loginAsUser();
});

When('I add products 1, 2, 3 and 9 to cart', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.addProductsToCart();
});

When('I go to the shopping cart', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.shoppingCartBtn.click();
});

Then('the cart should contain {int} items', async function (expectedCount) {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  const count = await selfHealPage.getCartItemsCount();
  expect(count).toBe(expectedCount);
});

When('I proceed to checkout and place the order', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.checkout();
});

When('I view the invoice for the first order', async function () {
  const selfHealPage = pageManager.getSelfHealDemoPage();
  await selfHealPage.viewFirstOrderInvoice();
});

Then('the invoice should be displayed', async function () {
  const page = browserContext.getPage();
  await expect(page.getByRole('heading', { name: /Invoice for Order/ })).toBeVisible({ timeout: 45000 });
});
