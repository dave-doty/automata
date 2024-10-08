
// below is copied (without much understanding on my part except the state machine from https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

// https://ace.c9.io/tool/mode_creator.html
// https://cloud9-sdk.readme.io/docs/highlighting-rules  // don't pay attention to this; it's insufficient


define('ace/mode/regex', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var regexHighlightRules = require("ace/mode/regex_highlight_rules").regexHighlightRules;

    var Mode = function() {
        this.HighlightRules = regexHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/regex_highlight_rules', function(require, exports, module) {
    var oop = require("../lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var regexHighlightRules = function() {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        var comment        = { regex: /\/\/.*/, token: "comment" };
        var alphabetSymbol = { regex: /(?:\w|@|\.)/, token: "string" };

        this.$rules = {
            start: [
                comment,
                { regex: /(?:\*|\+|\||\(|\))/, token: "operator" },
                alphabetSymbol
            ]
        };
    };

    oop.inherits(regexHighlightRules, TextHighlightRules);
    exports.regexHighlightRules = regexHighlightRules;
});
