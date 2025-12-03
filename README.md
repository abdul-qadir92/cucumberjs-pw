# Cucumber.js with Playwright on BrowserStack

This repository demonstrates how to run Cucumber.js tests with Playwright on BrowserStack, including concurrency configuration and execution strategies.

## Table of Contents

- [Overview](#overview)
- [BrowserStack Concurrency](#browserstack-concurrency)
- [Configuration](#configuration)
- [Local vs BrowserStack Execution](#local-vs-browserstack-execution)
- [Execution Examples](#execution-examples)
- [Concurrency Calculation](#concurrency-calculation)

## Overview

This project uses:
- **Cucumber.js** for BDD testing
- **Playwright** for browser automation
- **BrowserStack** for cross-platform testing
- **Page Object Model** for maintainable test code

### Browser Management Approach

**Important:** This repository implements a **per-scenario browser spawning** approach.

- **New browser instance per scenario**: Each scenario gets a fresh browser instance created in the `Before` hook
- **Automatic cleanup**: The `After` hook ensures proper cleanup of browser, context, and page resources after each scenario completes (even if it fails)
- **Isolation**: This approach provides complete test isolation - each scenario runs in its own browser instance with no shared state between scenarios
- **Reliability**: Ensures tests are independent and prevents one scenario's failures from affecting others

**Implementation Details:**
```javascript
// Before hook creates new browser per scenario
Before({ timeout: 60 * 1000 }, async function () {
  const browser = await chromium.launch({ headless: !isHeaded });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Store in shared context for step definitions
});

// After hook cleans up after each scenario
After({ timeout: 30 * 1000 }, async function () {
  // Close page, context, and browser
  // Reset all variables
});
```

**Benefits:**
- ✅ Complete test isolation
- ✅ No state leakage between scenarios
- ✅ Failed scenarios don't affect subsequent ones
- ✅ Easier debugging and maintenance

**Considerations:**
- Each scenario takes slightly longer to execute due to browser startup/teardown
- Uses more system resources compared to reusing browsers across scenarios

## BrowserStack Concurrency

Understanding concurrency in BrowserStack is crucial for optimizing test execution time and managing your BrowserStack account limits.

### How Concurrency Works

BrowserStack concurrency is calculated based on three key parameters:

1. **`--parallel` flag** in Cucumber.js command
2. **`parallelsPerPlatform`** in `browserstack.yml`
3. **Number of platforms** configured in `browserstack.yml`

### Concurrency Formula

```
Total Concurrency = Number of Platforms × parallelsPerPlatform
```

**Important Notes:**
- The `--parallel` flag in Cucumber.js determines how many scenarios run in parallel **per platform**
- The `parallelsPerPlatform` in `browserstack.yml` determines how many parallel sessions run **per platform**
- If `--parallel` is not specified, it defaults to `1`
- The final concurrency is the product of platforms and `parallelsPerPlatform`

## Configuration

### browserstack.yml

```yaml
platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
  - browserName: safari
    osVersion: 18.6
    deviceName: iPhone 16
  - browserName: chrome
    osVersion: 12.0
    deviceName: Samsung Galaxy S22 Ultra

parallelsPerPlatform: 5
```

### package.json Scripts

```json
{
  "scripts": {
    "test:browserstack:all-features": "npx browserstack-node-sdk cucumber-js --tags @all-features",
    "test:browserstack:all-features:parallel": "npx browserstack-node-sdk cucumber-js --tags @all-features --parallel 5"
  }
}
```

## Local vs BrowserStack Execution

The BrowserStack Node SDK allows you to run the same test configuration both locally and on BrowserStack using the same `browserstack.yml` file. This is controlled by the `browserstackAutomation` flag.

### Running Tests Locally

To run tests on your local machine using the same profile configuration, set `browserstackAutomation: false` in `browserstack.yml`:

```yaml
browserstackAutomation: false
```

When `browserstackAutomation: false`:
- Tests run on your local machine using local browsers
- Uses the same `browserstack.yml` configuration structure
- Platforms configuration determines which local browsers/OS to use
- No BrowserStack minutes are consumed
- Faster iteration during development

### Running Tests on BrowserStack

To run tests on BrowserStack cloud, set `browserstackAutomation: true` in `browserstack.yml`:

```yaml
browserstackAutomation: true
```

When `browserstackAutomation: true`:
- Tests run on BrowserStack cloud infrastructure
- Accesses real devices and browsers across different platforms
- Uses BrowserStack minutes from your account
- Allows cross-platform testing without local setup

### Toggling Between Local and BrowserStack

**For Local Execution:**
```yaml
# browserstack.yml
browserstackAutomation: false
platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
```

**For BrowserStack Execution:**
```yaml
# browserstack.yml
browserstackAutomation: true
platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
  - browserName: safari
    osVersion: 18.6
    deviceName: iPhone 16
```

### Execution Differences

| Aspect | Local (`browserstackAutomation: false`) | BrowserStack (`browserstackAutomation: true`) |
|--------|-----------------------------------------|-----------------------------------------------|
| **Execution Location** | Your local machine | BrowserStack cloud |
| **Browsers** | Installed browsers on your machine | BrowserStack's browser library |
| **Platforms** | Limited to your OS | All platforms in config (Windows, iOS, Android, etc.) |
| **Cost** | Free | Consumes BrowserStack minutes |
| **Speed** | Fast (no network latency) | Depends on network and queue |
| **Isolation** | Uses your local environment | Isolated cloud environment |
| **Parallel Execution** | Limited by local resources | Limited by BrowserStack plan |

### Running the Same Profile Locally

**Step 1:** Update `browserstack.yml`:
```yaml
browserstackAutomation: false  # Set to false for local execution
platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
parallelsPerPlatform: 1  # Adjust based on your local machine capacity
```

**Step 2:** Run tests using the same BrowserStack SDK command:
```bash
# This will now run locally instead of on BrowserStack
npx browserstack-node-sdk cucumber-js --tags @all-features
```

**Step 3:** Switch back to BrowserStack when ready:
```yaml
browserstackAutomation: true  # Set back to true for BrowserStack execution
```

### Local Execution Best Practices

1. **Start with Local Testing**: Use `browserstackAutomation: false` during development to:
   - Catch bugs quickly
   - Save BrowserStack minutes
   - Test faster iterations

2. **Use Lower Parallelism Locally**: Your local machine may not handle the same concurrency as BrowserStack:
   ```yaml
   parallelsPerPlatform: 1  # Start with 1, increase based on your machine
   ```

3. **Platform Limitations**: Remember that locally you can only test:
   - Browsers installed on your machine
   - Operating system you're running on
   - No mobile device testing unless using emulators

4. **Before CI/CD**: Always test on BrowserStack (`browserstackAutomation: true`) before:
   - Running in CI/CD pipelines
   - Running cross-platform test suites
   - Running on real mobile devices

### Example Workflow

```bash
# 1. Development: Run locally with browserstackAutomation: false
# Edit browserstack.yml: browserstackAutomation: false
npx browserstack-node-sdk cucumber-js --tags @all-features

# 2. Test specific scenarios locally
npx browserstack-node-sdk cucumber-js --tags @smoke

# 3. Ready for cross-platform: Switch to BrowserStack
# Edit browserstack.yml: browserstackAutomation: true
npx browserstack-node-sdk cucumber-js --tags @all-features

# 4. CI/CD: Run full suite on BrowserStack
npm run test:browserstack:all-features
```

## Concurrency Calculation

### Scenario 1: Single Platform with parallelsPerPlatform: 1

**Configuration:**
- Platforms: 1
- `parallelsPerPlatform`: 1
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features --parallel 5`

**Result:**
- **Concurrency: 1**
- The `--parallel 5` flag is ignored because `parallelsPerPlatform: 1` limits execution to 1 parallel session per platform

### Scenario 2: Single Platform with parallelsPerPlatform: 5

**Configuration:**
- Platforms: 1
- `parallelsPerPlatform`: 5
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features --parallel 5`

**Result:**
- **Concurrency: 5**
- Calculation: `1 platform × 5 parallelsPerPlatform = 5 concurrent sessions`

### Scenario 3: No Parallel Flag with parallelsPerPlatform: 1

**Configuration:**
- Platforms: 1
- `parallelsPerPlatform`: 1
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features`

**Result:**
- **Concurrency: 1**
- No `--parallel` flag means sequential execution, limited by `parallelsPerPlatform: 1`

### Scenario 4: No Parallel Flag with parallelsPerPlatform: 5

**Configuration:**
- Platforms: 1
- `parallelsPerPlatform`: 5
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features`

**Result:**
- **Concurrency: 5**
- Even without `--parallel` flag, `parallelsPerPlatform: 5` allows 5 concurrent sessions per platform

### Scenario 5: Multiple Platforms (3) with parallelsPerPlatform: 1

**Configuration:**
- Platforms: 3 (Windows Chrome, iOS Safari, Android Chrome)
- `parallelsPerPlatform`: 1
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features`

**Result:**
- **Concurrency: 3**
- Calculation: `3 platforms × 1 parallelsPerPlatform = 3 concurrent sessions`
- One session per platform running simultaneously

### Scenario 6: Multiple Platforms (3) with parallelsPerPlatform: 5

**Configuration:**
- Platforms: 3 (Windows Chrome, iOS Safari, Android Chrome)
- `parallelsPerPlatform`: 5
- Command: `npx browserstack-node-sdk cucumber-js --tags @all-features`

**Result:**
- **Concurrency: 15**
- Calculation: `3 platforms × 5 parallelsPerPlatform = 15 concurrent sessions`
- Five sessions per platform, all running simultaneously across all platforms

## Execution Examples

### Running Tests Locally

**Prerequisites:** Set `browserstackAutomation: false` in `browserstack.yml`

```bash
# Run all features locally
npx browserstack-node-sdk cucumber-js --tags @all-features

# Run with parallel execution (limited by local machine)
npx browserstack-node-sdk cucumber-js --tags @all-features --parallel 3

# Run specific tags locally
npx browserstack-node-sdk cucumber-js --tags @smoke
npx browserstack-node-sdk cucumber-js --tags @regression
```

### Running Tests on BrowserStack

**Prerequisites:** Set `browserstackAutomation: true` in `browserstack.yml`

```bash
# Sequential execution (concurrency based on parallelsPerPlatform)
npm run test:browserstack:all-features

# With parallel execution
npm run test:browserstack:all-features:parallel

# Run specific tags
npm run test:browserstack:smoke
npm run test:browserstack:regression

# All features with parallel execution
npm run test:browserstack:all-features -- --parallel 5
```

### Switching Between Local and BrowserStack

```bash
# 1. Edit browserstack.yml: Set browserstackAutomation: false
# 2. Run locally
npx browserstack-node-sdk cucumber-js --tags @all-features

# 3. Edit browserstack.yml: Set browserstackAutomation: true  
# 4. Run on BrowserStack
npx browserstack-node-sdk cucumber-js --tags @all-features
```

## Best Practices

1. **Match Parallel Flags**: Ensure your `--parallel` value in the command doesn't exceed your BrowserStack plan's concurrency limit per platform.

2. **Consider Account Limits**: Your BrowserStack account has a maximum concurrent session limit. Calculate your total concurrency carefully:
   ```
   Total Concurrency = Number of Platforms × parallelsPerPlatform
   ```

3. **Optimize for Speed vs. Cost**: 
   - Higher concurrency = Faster execution but more BrowserStack minutes consumed
   - Lower concurrency = Slower execution but fewer BrowserStack minutes consumed

4. **Test Locally First**: Run tests locally before executing on BrowserStack to catch issues early:
   ```bash
   npm run test:all-features
   ```

## Current Configuration

Based on the current `browserstack.yml`:
- **browserstackAutomation**: `true` (runs on BrowserStack cloud)
  - Set to `false` to run locally on your machine
- **Platforms**: 3 (Windows Chrome, iOS Safari, Android Chrome)
- **parallelsPerPlatform**: 5
- **Maximum Concurrency**: 15 (3 × 5)

This means when running tests with `parallelsPerPlatform: 5`, you can have up to 15 concurrent BrowserStack sessions running simultaneously.

**To run locally**, change `browserstackAutomation: false` in `browserstack.yml`.

## Troubleshooting

### Issue: Tests are running slower than expected
- **On BrowserStack**: Check if `parallelsPerPlatform` is set too low
- **On BrowserStack**: Verify your BrowserStack account has sufficient concurrent session capacity
- **Locally**: Check your machine's CPU and memory resources
- **Locally**: Reduce `parallelsPerPlatform` if your machine can't handle current concurrency

### Issue: BrowserStack session limit exceeded
- Reduce `parallelsPerPlatform` value in `browserstack.yml`
- Reduce the number of platforms being tested simultaneously
- Check your BrowserStack account's concurrent session limit

### Issue: Tests fail locally but pass on BrowserStack
- Ensure `browserstackAutomation: false` is set correctly
- Check if required browsers are installed locally
- Verify local browser versions match your test requirements
- Platform-specific tests may only work on BrowserStack (mobile devices, different OS)

### Issue: BrowserStack credentials required even in local mode
- The SDK may still require credentials in the config file, but won't use them for local execution
- Ensure `browserstackAutomation: false` is set to avoid connecting to BrowserStack

## Additional Resources

- [BrowserStack Documentation](https://www.browserstack.com/docs)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Playwright Documentation](https://playwright.dev/)

