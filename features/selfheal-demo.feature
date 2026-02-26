@all-features @selfheal-demo
Feature: BrowserStack Self-Heal Demo
  As a user
  I want to test the BrowserStack Self-Heal Demo app
  So that I can verify the demo scenarios and user flow work correctly

  @smoke @demo-scenarios
  Scenario: Complete demo scenarios - ID, XPath, content and class changes
    Given I navigate to "https://browserstack.github.io/selfheal-demo-app"
    Then the page title should match "browserstack-selfheal-demo"
    When I toggle the self-heal demo feature
    And I click "Try Demo Scenarios"
    And I fill the static ID field with "This is a test for static id field"
    And I fill the xpath field with "This is a test for xpath field"
    And I click the Submit button
    And I click the Proceed button
    And I click the feature toggle
    Then the progress status should be "Status: In Progress"
    When I click the progress complete button
    Then the progress status should be "Status: Complete"

  @regression @user-flow
  Scenario: Complete user flow - login, add to cart, checkout and view invoice
    Given I navigate to "https://browserstack.github.io/selfheal-demo-app"
    Then the page title should match "browserstack-selfheal-demo"
    When I toggle the self-heal demo feature
    And I click the Profile button
    And I select the second user and sign in
    And I add products 1, 2, 3 and 9 to cart
    And I go to the shopping cart
    Then the cart should contain 4 items
    When I proceed to checkout and place the order
    And I view the invoice for the first order
    Then the invoice should be displayed
