Feature: Checkout functionality
  As a user of SauceDemo
  I want to complete the checkout process
  So that I can finalize my purchase

  @smoke
  Scenario: Successful checkout completes with confirmation message
    Given the user is on the SauceDemo login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    And the user adds following products to cart:
      | product_name         |
      | Sauce Labs Backpack   |
    And the user proceeds to checkout
    And the user fills checkout information with first name "John", last name "Doe" and postal code "12345"
    And the user continues to the next checkout step
    And the user finishes the checkout
    Then the user should see the order confirmation message "Thank you for your order!"

  @regression
  Scenario Outline: Checkout validation shows an error when required field is missing
    Given the user is on the SauceDemo login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    And the user adds following products to cart:
      | product_name         |
      | Sauce Labs Backpack   |
    And the user proceeds to checkout
    And the user fills checkout information with first name "<firstName>", last name "<lastName>" and postal code "<postalCode>"
    And the user continues to the next checkout step
    Then the user should see checkout error message "<errorMessage>"

    Examples:
      | firstName | lastName | postalCode | errorMessage                          |
      |           | Doe      | 12345      | Error: First Name is required         |
      | John      |          | 12345      | Error: Last Name is required          |
      | John      | Doe      |            | Error: Postal Code is required        |