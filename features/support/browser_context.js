// Shared browser context module
let browser;
let context;
let page;

module.exports = {
  getBrowser: () => browser,
  setBrowser: (b) => { browser = b; },
  getContext: () => context,
  setContext: (c) => { context = c; },
  getPage: () => page,
  setPage: (p) => { page = p; },
  reset: () => {
    browser = null;
    context = null;
    page = null;
  }
};

