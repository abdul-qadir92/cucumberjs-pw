const BasePage = require('./BasePage');

const SELFHEAL_DEMO_URL = 'https://browserstack.github.io/selfheal-demo-app';

/**
 * SelfHeal Demo Page Object Model
 * Handles interactions with BrowserStack Self-Heal Demo app
 * Translated from BStackSelfHealDemoTest.java
 */
class SelfHealDemoPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators - Demo Scenarios
  get selfHealToggle() {
    return this.page.locator('#self-heal-demo-toggle');
  }

  get tryDemoScenariosBtn() {
    return this.page.locator('#cta-button');
  }

  get staticIdField() {
    return this.page.locator('#static-id-field');
  }

  get xpathFormInput() {
    return this.page.locator('xpath=//div[@id="xpath-form"]/input');
  }

  get submitButton() {
    return this.page.locator('xpath=//button[@title="Submit"]');
  }

  get proceedButton() {
    return this.page.locator('xpath=//button[text()="Proceed"]');
  }

  get featureToggle() {
    return this.page.locator('.feature-toggle');
  }

  get progressStatus() {
    return this.page.locator('#progress-status-id');
  }

  get progressBtn100() {
    return this.page.locator('#progress-btn-100');
  }

  // Locators - User Flow
  get profileBtn() {
    return this.page.locator('#profile-btn');
  }

  get userSelect() {
    return this.page.locator('#user-select');
  }

  get loginSubmitBtn() {
    return this.page.locator('#login-submit');
  }

  get productCard1() {
    return this.page.locator('#product-card-1');
  }

  get productCard2() {
    return this.page.locator('#product-card-2');
  }

  get addToCart1Btn() {
    return this.productCard1.locator("button[title='Add to Cart']");
  }

  get addToCart2Btn() {
    return this.page.locator('#add-to-cart-2');
  }

  get addToCart3Btn() {
    return this.page.locator('#add-to-cart-3');
  }

  get addToCart9Btn() {
    return this.page.locator('#add-to-cart-9');
  }

  get shoppingCartBtn() {
    return this.page.locator('#shopping-cart-btn');
  }

  get cartItems() {
    return this.page.locator('#cart-item');
  }

  get checkoutBtn() {
    return this.page.locator('#checkout-btn');
  }

  get placeOrderBtn() {
    return this.page.locator('#place-order-btn');
  }

  get firstOrderItem() {
    return this.page.locator('li.order-list-item').first();
  }

  viewInvoiceBtn(orderId) {
    return this.page.locator(`#view-invoice-btn-${orderId}`);
  }

  /**
   * Navigate to SelfHeal Demo app
   */
  async open() {
    await this.navigateTo(SELFHEAL_DEMO_URL);
  }

  /**
   * Toggle the healing demo feature
   */
  async toggleSelfHealDemo() {
    await this.selfHealToggle.click();
  }

  /**
   * Click "Try Demo Scenarios" button
   */
  async clickTryDemoScenarios() {
    await this.tryDemoScenariosBtn.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Fill static ID field
   */
  async fillStaticIdField(text) {
    await this.staticIdField.fill(text);
  }

  /**
   * Fill xpath form input
   */
  async fillXpathField(text) {
    await this.xpathFormInput.fill(text);
  }

  /**
   * Click Submit button (content description change scenario)
   */
  async clickSubmit() {
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click Proceed button (text change scenario)
   */
  async clickProceed() {
    await this.proceedButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click feature toggle (class name change scenario)
   */
  async clickFeatureToggle() {
    await this.featureToggle.click();
  }

  /**
   * Get progress status text
   */
  async getProgressStatusText() {
    return await this.progressStatus.textContent();
  }

  /**
   * Click progress button to complete
   */
  async clickProgressComplete() {
    await this.progressBtn100.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Complete demo scenarios flow
   */
  async completeDemoScenarios() {
    await this.toggleSelfHealDemo();
    await this.clickTryDemoScenarios();
    await this.fillStaticIdField('This is a test for static id field');
    await this.fillXpathField('This is a test for xpath field');
    await this.clickSubmit();
    await this.clickProceed();
    await this.clickFeatureToggle();
    await this.clickProgressComplete();
  }

  /**
   * Click Profile button
   */
  async clickProfile() {
    await this.profileBtn.click();
  }

  /**
   * Select user from dropdown and sign in (selects second option)
   */
  async loginAsUser() {
    await this.userSelect.selectOption({ index: 1 });
    await this.loginSubmitBtn.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Add products to cart
   */
  async addProductsToCart() {
    await this.addToCart1Btn.click();
    await this.page.waitForTimeout(1000);
    await this.addToCart2Btn.click();
    await this.page.waitForTimeout(1000);
    await this.addToCart3Btn.click();
    await this.page.waitForTimeout(1000);
    await this.addToCart9Btn.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Proceed to checkout and place order (assumes already on cart page)
   */
  async checkout() {
    await this.checkoutBtn.click();
    await this.placeOrderBtn.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  /**
   * View invoice for first order
   */
  async viewFirstOrderInvoice() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    const firstOrder = this.page.locator('li.order-list-item').first();
    const orderId = await firstOrder.getAttribute('data-order-id');
    await this.viewInvoiceBtn(orderId).click();
    await this.page.waitForTimeout(2000);
  }
}

module.exports = SelfHealDemoPage;
