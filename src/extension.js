var vscode = require('vscode');
var Indent = require('./indent');

var languageSelectors = ['feature'];
var config;

function activate(context) {
    

    var disposable = vscode.commands.registerCommand('gherkin-indent.format', function () {
        format()
            .then(function () {
                //vscode.window.showInformationMessage('Succesfully formatting your gherkin code.');
            });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;


function format() {
    var config = vscode.workspace.getConfiguration('gherkin-indent');
    var active = vscode.window.activeTextEditor;
    if (!active)
        return;
    if (!active.document)
        return;
    var document = active.document;
    var range = new vscode.Range(0, 0, document.lineCount, document.getText().length);
    var originalText = document.getText(document.validateRange(range));
    var formatedText = new Indent(config).format(originalText);

    return updateEditor(formatedText, active, range);
}
function updateEditor(newText, active, range) {
    return active.edit(function (editor) { return editor.replace(range, newText); });
}

exports.format = format;

function deactivate() {
}
exports.deactivate = deactivate;