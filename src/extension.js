var vscode = require('vscode');
var fs = require('fs');
var cp = require('child_process');
var tmp = require("tmp");

var Table = require('./table').Table;

var dumpError = function (e) {
    if (e)
        console.log('elm-format err:', e);
    return [];
};

var languageSelectors = ['feature'];

function activate(context) {
    var disposable = vscode.commands.registerCommand('gherkin-formatter.format', function () {
        format()
            .then(function () {
                //vscode.window.showInformationMessage('Succesfully formatting your gherkin code.');
            });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;


function format() {
    var active = vscode.window.activeTextEditor;
    if (!active)
        return;
    if (!active.document)
        return;
    var document = active.document;
    var range = new vscode.Range(0, 0, document.lineCount, document.getText().length);
    var originalText = document.getText(document.validateRange(range));

    var formatedText = new Table().format(originalText);

    return updateEditor(formatedText, active, range);
}
function updateEditor(newText, active, range) {
    return active.edit(function (editor) { return editor.replace(range, newText); });
}

exports.format = format;

function deactivate() {
}
exports.deactivate = deactivate;