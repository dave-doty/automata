
// below is copied (without much understanding on my part except the state machine from https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

// https://ace.c9.io/tool/mode_creator.html
// https://cloud9-sdk.readme.io/docs/highlighting-rules  // don't pay attention to this; it's insufficient


define('ace/mode/nfa', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var nfaHighlightRules = require("ace/mode/nfa_highlight_rules").nfaHighlightRules;

    var Mode = function() {
        this.HighlightRules = nfaHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/nfa_highlight_rules', function(require, exports, module) {
    var oop = require("../lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var nfaHighlightRules = function() {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        var comment        = { regex: /\/\/.*/, token: "comment" };
        var setOperator    = { regex: /{|,|}/,  token: "operator" };
        var state          = { regex: /[\w$]+/, token: "variable" };
        // var alphabetSymbol = { regex: /[\w~!@%&_'<>#"\.\\\+\*\?\[\^\]\$\(\)\=\!\<\>\|\:]/, token: "string" };
        var alphabetSymbol = { regex: /(?:\w|~|!|@|%|&|_|'|<|>|#|"|\:|\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\=|\!|\<|\>|\|)/, token: "string" };
        var defnOperator   = /=/;

        this.$rules = {
            start: [
                {regex: /states/, token: "keyword", next: "states_keyword_read"},
                comment
            ],
            states_keyword_read: [
                {regex: defnOperator, token: "operator", next: "states"},
                comment
            ],
            states: [
                {regex: /input_alphabet/, token: "keyword", next: "input_alphabet_keyword_read"},
                {regex: /{|,|}/, token: "operator"},
                state,
                comment
            ],
            input_alphabet_keyword_read: [
                {regex: defnOperator, token: "operator", next: "input_alphabet"},
                comment
            ],
            input_alphabet: [
                {regex: /start_state/, token: "keyword", next: "start_state_keyword_read"},
                {regex: /{|,|}/, token: "operator"},
                alphabetSymbol,
                comment
            ],
            start_state_keyword_read: [
                {regex: defnOperator, token: "operator", next: "start_state"},
                comment
            ],
            start_state: [
                {regex: /accept_states/, token: "keyword", next: "accept_states_keyword_read"},
                state,
                comment
            ],
            accept_states_keyword_read: [
                {regex: defnOperator, token: "operator", next: "accept_states"},
                comment
            ],
            accept_states: [
                {regex: /delta/, token: "keyword", next: "delta_keyword_read"},
                {regex: /{|,|}/, token: "operator"},
                state,
                comment
            ],
            delta_keyword_read: [
                {regex: defnOperator, token: "operator", next: "delta_in_state"},
                comment
            ],
            delta_in_state: [
                state,
                {regex: /,/, token: "operator", next: "delta_in_symbol"},
                comment
            ],
            delta_in_symbol: [
                alphabetSymbol,
                {regex: /->/, token: "operator", next: "delta_out_state"},
                comment
            ],
            delta_out_state: [
                state,
                {regex: /{|,|}/, token: "operator"},
                {regex: /;/, token: "operator", next: "delta_in_state"},
                comment
            ]
        };
    };

    oop.inherits(nfaHighlightRules, TextHighlightRules);
    exports.nfaHighlightRules = nfaHighlightRules;
});
