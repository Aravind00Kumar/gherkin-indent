Feature: UI Widget - Overlay
 In order to allow system integrator to display model dialog
  As a developer,
 I want to develop a widget displays a dialog window that forces the user to interact with it before they can go back to using the parent application

Scenario: Display overlay
                Given Am on Overlay example page
      When I select overlay to display
    Then I should see a overlay dialog

Scenario Outline: Configure overlay title
    Given I configure the <title>
When I select overlay to display
     Then I should see overlay title as <title>

Examples:
  | title |
  | "Server Error"|
  | "404 Page not found"|

Scenario Outline: Configure overlay title
 #           Given I configure the <title>
When I select overlay to display
Then I should see overlay title as <title>

And I should see overlay title as <title>


Examples:
| title | index |
| "Server Error" |2|
| "404 Page not found" |5|

Scenario Outline: Configure overlay title
 #           Given I configure the <title>
When I select overlay to display
Then I should see overlay title as <title>

And I should see overlay title as <title>


Examples:
| title | index | count| error|
| "Server Error" |2| 12| 102|
| "404 Page not found" |5|12|"no error"|

