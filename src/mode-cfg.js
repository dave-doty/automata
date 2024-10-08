
// below is copied (without much understanding on my part except the state machine from https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

// https://ace.c9.io/tool/mode_creator.html
// https://cloud9-sdk.readme.io/docs/highlighting-rules  // don't pay attention to this; it's insufficient


define('ace/mode/cfg', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var cfgHighlightRules = require("ace/mode/cfg_highlight_rules").cfgHighlightRules;

    var Mode = function() {
        this.HighlightRules = cfgHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/cfg_highlight_rules', function(require, exports, module) {
    var oop = require("../lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var cfgHighlightRules = function() {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        //TODO: re-write this to look nice for CFGs
        var comment        = { regex: /\/\/.*/, token: "comment" };
        var alphabetRegex  = /(?:\w|~|!|@|%|&|_|'|<|>|#|"|\:|\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\=|\!|\<|\>)/;
        var operator       = /[\|;]/;

        this.$rules = {
            start: [
                {regex: alphabetRegex, token: "keyword", next: "production_rule_op"},
                comment
            ],
            production_rule_op: [
                {regex: /->/, token: "operator", next: "production_rule_out"},
                comment
            ],
            production_rule_out: [
                {regex: alphabetRegex, token: "string"},
                {regex: /\|/, token: "operator"},
                {regex: /;/, token: "operator", next: "production_rule_in"},
                comment
            ],
            production_rule_in: [
                {regex: alphabetRegex, token: "string", next: "production_rule_op"},
                comment
            ]
        };
    };

    oop.inherits(cfgHighlightRules, TextHighlightRules);
    exports.cfgHighlightRules = cfgHighlightRules;
});
