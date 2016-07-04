/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
var assert = require('assert');
var before = require('mocha').before;
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
var vscode = require('vscode');
var Indent = require('../src/indent');

var testData = 'Feature: UI Widget - Overlay\r\n In order to allow system integrator to display model dialog\r\n As a developer,\r\n I want to develop a widget displays a dialog window that forces the user to interact with it before they can go back to using the parent application\r\n\r\nScenario: Display overlay\r\n Given Am on Overlay example page\r\n When I select overlay to display\r\n Then I should see a overlay dialog\r\n\r\nScenario Outline: Configure overlay title\r\n Given I configure the <title>\r\n When I select overlay to display\r\n Then I should see overlay title as <title>\r\n\r\nExamples:\r\n| title |\r\n| "Server Error" |\r\n| "404 Page not found" |\r\n\r\nScenario Outline: Configure overlay title\r\n Given I configure the <title>\r\n When I select overlay to display\r\n Then I should see overlay title as <title>\r\n\r\nExamples:\r\n| title | index |\r\n| "Server Error" |2|\r\n| "404 Page not found" |5|\r\n\r\n';

var testData2 = 'Feature: UI Widget - Overlay\r\n In order to allow system integrator to display model dialog\r\n As a developer,\r\n I want to develop a widget displays a dialog window that forces the user to interact with it before they can go back to using the parent application\r\n\r\nScenario: Display overlay\r\n Given Am on Overlay example page\r\n When I select overlay to display\r\n Then I should see a overlay dialog\r\n\r\nScenario Outline: Configure overlay title\r\n Given I configure the <title>\r\n When I select overlay to display\r\n Then I should see overlay title as <title>\r\n\r\nExamples:\r\n | title |\r\n | "Server Error" |\r\n | "404 Page not found" |\r\n\r\nScenario Outline: Configure overlay title';

// Defines a Mocha test suite to group tests of similar kind together
suite("indent Tests", function () {

    var indent;
    // Defines a Mocha unit test
    before(function () {
        if (!indent){
            indent = new Indent();
            indent.init(testData)
        } 
    });

    test("Extract tables", function () {
        var tbls = indent.extract();
        assert.equal(2, tbls.length);
    });

    test("Format table", function(){
        var tbls = indent.extract();
        var formattedindent = indent.formatTableRows(tbls[1]);
        assert.equal(formattedindent[0].value.length,formattedindent[1].value.length);
    });

    test("Center pad with 3 test", function () {
        var str = "Hello";
        var result = indent.centerPad('Hello', 3);
        assert.equal(result, "  Hello ");
    });

    test("Center pas with 10 test", function () {
        var str = "Hello";
        var count = 10;
        var result = indent.centerPad('Hello', count);
        assert.equal(result.length, str.length + count);
    });

    test("Given step with only one empty space before", function () {
        var result = indent.isValidStep('  Given Am on Overlay example page','Given');
        assert.equal(result, true);
    });
    test("Given step with a tab  before", function () {
        var result = indent.isValidStep(' \t Given Am on Overlay example page','Given');
        assert.equal(result, true);
    });
    test("Given step with a new line  before", function () {
        var result = indent.isValidStep(' \n Given Am on Overlay example page','Given');
        assert.equal(result, true);
    });
    test("Given step with a #  before", function () {
        var result = indent.isValidStep('  #Given Am on Overlay example page','Given');
        assert.equal(result, false);
    });
    test("Given step with no leading space", function () {
        var result = indent.isValidStep('Given Am on Overlay example page','Given');
        assert.equal(result, true);
    });

    test("Given step with a @  before", function () {
        var result = indent.isValidStep(' #@ Given Am on Overlay example page','Given');
        assert.equal(result, false);
    });


});