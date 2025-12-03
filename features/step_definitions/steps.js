const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const browserContext = require('../support/browser_context');
const pageManager = require('../../pages/PageManager');

// Set default timeout to 30 seconds for all steps
setDefaultTimeout(30 * 1000);

let pageTitle;
let headingText;
let links;
let examplePage;

Before({ timeout: 60 * 1000 }, async function () {
  const isHeaded = process.env.HEADED === 'true' || process.env.HEADED === '1';
  const browser = await chromium.launch({ 
    headless: !isHeaded,
    timeout: 60000
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  // Store in shared context
  browserContext.setBrowser(browser);
  browserContext.setContext(context);
  browserContext.setPage(page);
});

After({ timeout: 30 * 1000 }, async function () {
  const page = browserContext.getPage();
  const context = browserContext.getContext();
  const browser = browserContext.getBrowser();
  
  // Clean up browser resources after each scenario, even if it fails
  if (page) {
    try {
      await page.close();
    } catch (error) {
      // Ignore errors during cleanup
    }
  }
  if (context) {
    try {
      await context.close();
    } catch (error) {
      // Ignore errors during cleanup
    }
  }
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      // Ignore errors during cleanup
    }
  }
  // Reset variables
  browserContext.reset();
  pageManager.reset();
  pageTitle = null;
  headingText = null;
  links = null;
  examplePage = null;
});

Given('I navigate to {string}', { timeout: 30 * 1000 }, async function (url) {
  // Determine which page object to use based on URL
  if (url.includes('example.com')) {
    examplePage = pageManager.getExamplePage();
    await examplePage.navigateTo(url);
  } else {
    const page = browserContext.getPage();
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }
});

When('I check the page title', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  pageTitle = await examplePage.getTitle();
});

Then('the page title should contain {string}', { timeout: 30 * 1000 }, async function (expectedText) {
  expect(pageTitle).toContain(expectedText);
});

When('I look at the page heading', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  headingText = await examplePage.getHeadingText();
});

Then('the heading should contain {string}', { timeout: 30 * 1000 }, async function (expectedText) {
  expect(headingText).toContain(expectedText);
});

When('I look at the links on the page', { timeout: 30 * 1000 }, async function () {
  examplePage = pageManager.getExamplePage();
  links = await examplePage.getAllLinks();
});

Then('I should see a link with text {string}', { timeout: 30 * 1000 }, async function (expectedText) {
  examplePage = pageManager.getExamplePage();
  const found = await examplePage.hasLinkWithText(expectedText);
  expect(found).toBe(true);
});

