@all-features @navigation-tests
Feature: Navigation Feature
  As a user
  I want to navigate and verify page elements
  So that I can ensure the page is functional

  @regression @smoke @page-load
  Scenario: Verify page loads successfully
    Given I navigate to "https://example.com"
    When I wait for the page to load
    Then the page should be loaded successfully

  @regression @page-content
  Scenario: Verify page contains expected content
    Given I navigate to "https://example.com"
    When I check the page content
    Then the page should contain "Example Domain"

