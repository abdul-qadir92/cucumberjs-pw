@all-features @example-tests
Feature: Example Feature
  As a user
  I want to perform some actions
  So that I can test the application

  @smoke @title-verification
  Scenario: Verify page title
    Given I navigate to "https://example.com"
    When I check the page title
    Then the page title should contain "Example Domain"

  @regression @content-verification @heading-verification
  Scenario: Verify page heading
    Given I navigate to "https://example.com"
    When I look at the page heading
    Then the heading should contain "Example Domain"

  @content-verification @link-verification
  Scenario: Verify page link
    Given I navigate to "https://example.com"
    When I look at the links on the page
    Then I should see a link with text "More information..."

