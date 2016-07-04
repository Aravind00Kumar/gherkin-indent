# gherkin-indent

Gherkin Indent sets the indentation for Gherkin (cucumberjs) steps and examples.  Automatically applies coloring for features, scenarios and steps in `.feature` files

## How to use

Apply `Gherkin Indent` from the command palette `Ctrl+Shift+P` (Windows, Linux) or `Cmd-Shift-P` (OSX) to apply indentation for the `.feature` files or you can use key shortcut `ctrl+g ctrl+f` (Windows, Linux) `Cmd+g Cmd+f` (OSX).

### Code snippets  

Use the following code snippets to add scenarios and steps.

* `feature`
* `scenario`
* `outline`
* `given`
* `then`
* `when`
* `and`
* `but`

_Note: Select steps and use comment shortcut keys to comment the steps._

![Screen Shot\](https://raw.githubusercontent.com/Aravind00Kumar/gherkin-indent/master/images/screen_shot.gif)

## Requirements

* You will need to install Visual Studio Code 1.2.1 or higher.
* From the command palette `Ctrl+Shift+P` (Windows, Linux) or `Cmd+Shift+P` (OSX) select Install Extension, choose `Gherkin Indent` and reload Visual Studio Code.

## Extension Settings

This extension contributes the following settings:

* `gherkin-indent.stepIndent`: Sets the indent value. (default is `7`). Note: `stepIndent` includes step name length. 

## Release Notes

### 2.0.0

* Added new code snippets.
* Added syntax highlighter for step keywords.

### 1.0.1

* Bug fixes.

### 1.0.0

Added features 
* Auto table formatting for examples.
* Indentation for steps `Given, When, Then, And` and `But`. 

## Contributions
 
Feel free to contribute by posting issues or pull requests on [gherkin-indent](https://github.com/Aravind00Kumar/gherkin-indent)

-----------------------------------------------------------------------------------------------------------

### References to write Gherkin

* [Gherkin](http://docs.behat.org/en/v3.0/guides/1.gherkin.html)

**Enjoy!**