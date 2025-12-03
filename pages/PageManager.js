const ExamplePage = require('./ExamplePage');
const browserContext = require('../features/support/browser_context');

/**
 * Page Manager - Manages page object instances
 * Singleton pattern to ensure single instance per page type
 */
class PageManager {
  constructor() {
    this.pages = {};
  }

  /**
   * Get or create a page object instance
   * @param {string} pageName - Name of the page (e.g., 'example')
   * @returns {BasePage} Page object instance
   */
  getPage(pageName) {
    const page = browserContext.getPage();
    
    if (!page) {
      throw new Error('Page is not initialized. Make sure browser is launched in Before hook.');
    }

    if (!this.pages[pageName]) {
      switch (pageName.toLowerCase()) {
        case 'example':
          this.pages[pageName] = new ExamplePage(page);
          break;
        default:
          throw new Error(`Page object "${pageName}" is not defined.`);
      }
    }

    return this.pages[pageName];
  }

  /**
   * Reset all page instances
   */
  reset() {
    this.pages = {};
  }

  /**
   * Get Example Page
   * @returns {ExamplePage} Example page instance
   */
  getExamplePage() {
    return this.getPage('example');
  }
}

module.exports = new PageManager();

