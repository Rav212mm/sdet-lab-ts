Feature: Product visibility in inventory
  As a user of SauceDemo
  I want to see products in the inventory
  So that I can find what I'm looking for

  @smoke
  Scenario: Product is visible in the inventory after login
    Given the user is on the SauceDemo login page
    When the user enters valid username "standard_user" and password "secret_sauce"
    Then the product "Sauce Labs Backpack" should be visible in the inventory