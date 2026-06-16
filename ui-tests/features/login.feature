Feature: User Login functionality
  As a user of SauceDemo
  I want to log into the application
  So that I can purchase products

  @smoke
  Scenario: Successful login as standard user
    Given the user is on the SauceDemo login page
    When the user logs in as "standard" role
    Then the user should be redirected to the inventory page

  @regression
  Scenario Outline: Login with different credentials
    Given the user is on the SauceDemo login page
    When the user enters username "<username>" and password "<password>"
    Then the user should see error message "<errorMessage>"

    Examples:
      | username         | password         | errorMessage                       |
      | locked_out_user  | secret_sauce     | Epic sadface: Sorry, this user has been locked out. |
      | standard_user    | wrong_password   | Epic sadface: Username and password do not match any user in this service |

  @regression
  Scenario: Login with empty username shows a required-field error
    Given the user is on the SauceDemo login page
    When the user enters username "" and password "secret_sauce"
    Then the user should see error message "Epic sadface: Username is required"

  @regression
  Scenario: Login with missing password shows a required-field error
    Given the user is on the SauceDemo login page
    When the user enters username "standard_user" and password ""
    Then the user should see error message "Epic sadface: Password is required"

  @regression
  Scenario: Successful login as problem_user reaches the inventory page
    Given the user is on the SauceDemo login page
    When the user enters valid username "problem_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page

  @regression
  Scenario: Successful login as performance_glitch_user reaches the inventory page
    Given the user is on the SauceDemo login page
    When the user enters valid username "performance_glitch_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page
