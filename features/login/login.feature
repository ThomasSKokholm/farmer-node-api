Feature: Login

    User can login

    Scenario: As a user I can login
        Given User is on login page
        # And
        # AND
        When User clicks "login-btn"
        Then User should be on the "login success" page
