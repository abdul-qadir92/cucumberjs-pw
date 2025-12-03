/**
 * Base Page Object Model class
 * All page objects should extend this class
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - The URL to navigate to
   */
  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }

  /**
   * Get the page title
   * @returns {Promise<string>} The page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get the current page URL
   * @returns {string} The current URL
   */
  getUrl() {
    return this.page.url();
  }

  /**
   * Wait for page to load
   * @param {string} state - Load state to wait for (default: 'networkidle')
   */
  async waitForLoad(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for DOM content to load
   */
  async waitForDOMContent() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get text content from body
   * @returns {Promise<string>} The body text content
   */
  async getBodyText() {
    return await this.page.locator('body').textContent();
  }

  /**
   * Check if page contains text
   * @param {string} text - Text to search for
   * @returns {Promise<boolean>} True if text is found
   */
  async containsText(text) {
    const bodyText = await this.getBodyText();
    return bodyText.includes(text);
  }
}

module.exports = BasePage;

