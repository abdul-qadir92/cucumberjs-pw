// Shared browser context module
let browser;
let context;
let page;
const DEFAULT_TIMEOUT = 45000;
module.exports = {
  getBrowser: () => browser,
  setBrowser: (b) => { browser = b; },
  getContext: () => context,
  setContext: (c) => { 
    context = c; 
    // Force the SDK to recognize the 45s limit at the context level
    if (context) {
      context.setDefaultTimeout(DEFAULT_TIMEOUT);
      context.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
    }
  },
  getPage: () => page,
  setPage: (p) => {
    page = p;
    // Force the 45s limit at the page level
    if (page) {
      page.setDefaultTimeout(DEFAULT_TIMEOUT);
      page.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
    }
  },
};

