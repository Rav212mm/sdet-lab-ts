Feature: Shopping functionality
  As a user of SauceDemo
  I want to add products to cart and checkout
  So that I can complete my purchase

  @regression
  Scenario Outline: Add multiple products to cart using DataTable
    Given the user is on the SauceDemo login page
    When the user logs in with username "<username>" and password "<password>"
    And the user adds following products to cart:
      | product_name     |
      | <product1>       |
      | <product2>       |
    Then the cart should contain <expectedItemCount> items

    Examples:
      | username      | password     | product1            | product2              | expectedItemCount |
      | standard_user | secret_sauce | Sauce Labs Backpack | Sauce Labs Bike Light | 2                 |

  @known-bug
  Scenario Outline: Add to cart buttons broken for problem_user
    Given the user is on the SauceDemo login page
    When the user logs in with username "<username>" and password "<password>"
    And the user adds following products to cart:
      | product_name     |
      | <product1>       |
      | <product2>       |
    Then the cart should contain <expectedItemCount> items

    Examples:
      | username     | password     | product1                | product2                 | expectedItemCount |
      | problem_user | secret_sauce | Sauce Labs Bolt T-Shirt | Sauce Labs Fleece Jacket | 0                 |

  @known-bug
  Scenario Outline: Add multiple products to cart with price validation
    Given the user is on the SauceDemo login page
    When the user logs in with username "<username>" and password "<password>"
    And the user adds following products to cart:
      | product_name     |
      | <product1>       |
      | <product2>       |
      | <product3>       |
    Then the cart should contain <expectedItemCount> items
    And the total price of items in cart should be "<expectedTotalPrice>"
    And the product "<product1>" should be visible in the cart

    Examples:
      | username         | password         | product1        | product2        | product3        | expectedItemCount | expectedTotalPrice |
      | standard_user    | secret_sauce     | Sauce Labs Backpack | Sauce Labs Bike Light | Sauce Labs Bolt T-Shirt | 3                 | 55.97              |
