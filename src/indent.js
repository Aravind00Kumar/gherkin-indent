var Indent = function (config) {
    this.stepIndent = 7;

    if (config && config.stepIndent)
        this.stepIndent = config.stepIndent;

    this.originalText = "";
    this.lines = [];
    this.languageIndex = '0';
    var words = {
        scenario: ['Scenario'],
        given: ['Given'],
        when: ['When'],
        then: ['Then'],
        and: ['And'],
        but: ['But'],
    };

    var activeWords = {
        scenario: words.scenario[this.languageIndex],
        given: words.given[this.languageIndex],
        when: words.when[this.languageIndex],
        then: words.then[this.languageIndex],
        and: words.and[this.languageIndex],
        but: words.but[this.languageIndex],
    }

    this.init = function (originalText) {
        var formatedText = '';
        this.originalText = originalText;
        this.lines = this.originalText.split('\r\n');
        if (this.lines[this.lines.length - 1].indexOf('|') !== -1)
            this.lines.push(" ");
    }

    this.format = function (originalText) {
        this.init(originalText);
        this.formatSteps();

        var tables = this.extract();
        var formattedTables = [];
        tables.forEach(function (table) {
            var formattedTable = this.formatTableRows(table);
            formattedTable.forEach(function (element) {
                this.lines[element.lineNumber] = element.value;
            }, this);
        }, this);

        formatedText = this.lines.join('\r\n');
        return formatedText;
    }

    this.extract = function () {
        var tables = [];
        var rows = [];
        this.lines.forEach(function (line, index) {
            if (line.indexOf('|') !== -1) {
                rows.push({ value: line, lineNumber: index });
                if (index + 1 < this.lines.length && this.lines[index + 1].indexOf('|') === -1) {
                    tables.push(rows);
                    rows = [];
                }
            }
        }, this);
        return tables;
    }

    this.formatSteps = function () {
        var firstOccurrence;
        this.lines.forEach(function (line, index) {
            if (this.isValidStep(line, activeWords.given)) {
                this.lines[index] = this.leftPad(line, activeWords.given);
            } else if (this.isValidStep(line, activeWords.when)) {
                this.lines[index] = this.leftPad(line, activeWords.when);
            } else if (this.isValidStep(line, activeWords.then)) {
                this.lines[index] = this.leftPad(line, activeWords.then);
            } else if (this.isValidStep(line, activeWords.and)) {
                this.lines[index] = this.leftPad(line, activeWords.and);
            } else if (this.isValidStep(line, activeWords.but)) {
                this.lines[index] = this.leftPad(line, activeWords.but);
            }
        }, this);
    }

    this.isValidStep = function (line, stepName) {
        var pattern = /^[\s\r\t\n]+$/;
        if (line.indexOf(stepName) !== -1) {
            var first = line.substr(0, line.indexOf(stepName));
            if (first.length === 0) return true;
            if (pattern.test(first)) return true;
        }
        return false;
    }


    this.formatTableRows = function (rows) {
        var columns = [], indexes = [], i, j, max;
        rows.forEach(function (element, index) {
            if (this.isValidStep(element.value, "|")) {
                var newstrings = element.value.match(/(?=\S)[^\|]+?(?=\s*(\||$))/g);
                newstrings.splice(0, 0,"");
                newstrings.push("");
                columns.push(newstrings);
                indexes.push(index);
            };
        }, this);

        for (i = 0; i < columns[0].length; i++) {
            max = this.longest(i, columns);
            if (max > 0) {
                for (j = 0; j < columns.length; j++) {
                    var newValue = this.centerPad(columns[j][i], max - columns[j][i].length)
                    columns[j][i] = newValue;
                }
            }
        }

        for (i = 0; i < indexes.length; i++) {
                rows[indexes[i]].value = columns[i].join('|');
        }

        return rows;
    }

    this.longest = function (col, elements) {
        var max = elements[0][col].length;
        for (var i = 1; i < elements.length; i++) {
            if (elements[i][col].length > max) max = elements[i][col].length;
        }
        return max;
    }

    this.centerPad = function (str, count) {
        if (count > 0) {
            var start = Math.ceil(count / 2);
            var end = Math.floor(count / 2);
            return Array(start + 1).join(" ") + str + Array(end + 1).join(" ");
        }
        return str;
    }

    this.leftPad = function (str, stepName) {
        if (this.stepIndent > stepName.length) {
            var from = str.indexOf(stepName);
            var rem = str.substr(from, str.length - from);
            var step = Array(this.stepIndent - stepName.length + 1).join(" ") + rem;
            return step;
        }
        return str;
    }

}

module.exports = Indent;