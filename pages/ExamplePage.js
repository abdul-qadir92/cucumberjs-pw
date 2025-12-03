const BasePage = require('./BasePage');

/**
 * Example Page Object Model
 * Handles all interactions with example.com
 */
class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators
  get heading() {
    return this.page.locator('h1');
  }

  get links() {
    return this.page.locator('a');
  }

  get learnMoreLink() {
    return this.page.locator('a[href="https://iana.org/domains/example"]');
  }

  /**
   * Get the heading text
   * @returns {Promise<string>} The heading text
   */
  async getHeadingText() {
    return await this.heading.textContent();
  }

  /**
   * Get all links on the page
   * @returns {Promise<Array>} Array of link elements
   */
  async getAllLinks() {
    return await this.links.all();
  }

  /**
   * Get all link texts
   * @returns {Promise<Array<string>>} Array of link texts
   */
  async getAllLinkTexts() {
    const links = await this.getAllLinks();
    return await Promise.all(
      links.map(link => link.textContent())
    );
  }

  /**
   * Check if a link with specific text exists
   * @param {string} linkText - The link text to search for
   * @returns {Promise<boolean>} True if link is found
   */
  async hasLinkWithText(linkText) {
    const linkTexts = await this.getAllLinkTexts();
    return linkTexts.some(text => text && text.includes(linkText.trim()));
  }

  /**
   * Navigate to example.com
   */
  async open() {
    await this.navigateTo('https://example.com');
  }

  /**
   * Get the "Learn more" link element
   * @returns {Locator} The learn more link locator
   */
  getLearnMoreLink() {
    return this.learnMoreLink;
  }

  /**
   * Get the text of the "Learn more" link
   * @returns {Promise<string>} The link text
   */
  async getLearnMoreLinkText() {
    return await this.learnMoreLink.textContent();
  }

  /**
   * Click the "Learn more" link
   */
  async clickLearnMoreLink() {
    await this.learnMoreLink.click();
  }

  /**
   * Check if the "Learn more" link is visible
   * @returns {Promise<boolean>} True if link is visible
   */
  async isLearnMoreLinkVisible() {
    return await this.learnMoreLink.isVisible();
  }

  /**
   * Get the href attribute of the "Learn more" link
   * @returns {Promise<string>} The href attribute value
   */
  async getLearnMoreLinkHref() {
    return await this.learnMoreLink.getAttribute('href');
  }
}

module.exports = ExamplePage;

