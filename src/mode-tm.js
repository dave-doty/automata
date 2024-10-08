
// below is copied (without much understanding on my part except the state machine from https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

// https://ace.c9.io/tool/mode_creator.html
// https://cloud9-sdk.readme.io/docs/highlighting-rules  // don't pay attention to this; it's insufficient


define('ace/mode/tm', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var tmHighlightRules = require("ace/mode/tm_highlight_rules").tmHighlightRules;

    var Mode = function() {
        this.HighlightRules = tmHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/tm_highlight_rules', function(require, exports, module) {
    var oop = require("../lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var tmHighlightRules = function() {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        var comment        = { regex: /\/\/.*/, token: "comment" };
        var setOperator    = { regex: /{|,|}/,  token: "operator" };
        var state          = { regex: /[\w$]+/, token: "variable" };
        // var alphabetSymbol = { regex: /[\w~!@%&_'<>#"\.\\\+\*\?\[\^\]\$\(\)\=\!\<\>\|\:]/, token: "string" };
        var alphabetSymbol = { regex: /(?:\w|~|!|@|%|&|_|'|<|>|#|"|\:|\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\=|\!|\<|\>|\|)/, token: "string" };
        var moves          = { regex: /(?:L|R|S)/,
          token: "keyword"
          // token: "variable"
          // token: "number"
        };
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
                {regex: /tape_alphabet_extra/, token: "keyword", next: "tape_alphabet_extra_keyword_read"},
                {regex: /{|,|}/, token: "operator"},
                alphabetSymbol,
                comment
            ],
            tape_alphabet_extra_keyword_read: [
                {regex: defnOperator, token: "operator", next: "tape_alphabet_extra"},
                comment
            ],
            tape_alphabet_extra: [
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
                {regex: /accept_state/, token: "keyword", next: "accept_state_keyword_read"},
                state,
                comment
            ],
            accept_state_keyword_read: [
                {regex: defnOperator, token: "operator", next: "accept_state"},
                comment
            ],
            accept_state: [
                {regex: /reject_state/, token: "keyword", next: "reject_state_keyword_read"},
                state,
                comment
            ],
            reject_state_keyword_read: [
                {regex: defnOperator, token: "operator", next: "reject_state"},
                comment
            ],
            reject_state: [
                {regex: /num_tapes/, token: "keyword", next: "num_tapes_keyword_read"},
                state,
                comment
            ],
            num_tapes_keyword_read: [
                {regex: defnOperator, token: "operator", next: "num_tapes"},
                comment
            ],
            num_tapes: [
                {regex: /delta/, token: "keyword", next: "delta_keyword_read"},
                state,
                comment
            ],
            delta_keyword_read: [
                {regex: defnOperator, token: "operator", next: "delta_in_state"},
                comment
            ],
            delta_in_state: [
                state,
                {regex: /,/, token: "operator", next: "delta_in_symbols"},
                comment
            ],
            delta_in_symbols: [
                alphabetSymbol,
                {regex: /->/, token: "operator", next: "delta_out_state"},
                comment
            ],
            delta_out_state: [
                state,
                {regex: /,/, token: "operator", next: "delta_out_symbols"},
                comment
            ],
            delta_out_symbols: [
                alphabetSymbol,
                {regex: /,/, token: "operator", next: "delta_out_moves"},
                comment
            ],
            delta_out_moves: [
                moves,
                {regex: /;/, token: "operator", next: "delta_in_state"},
                comment
            ]
        };
    };

    oop.inherits(tmHighlightRules, TextHighlightRules);
    exports.tmHighlightRules = tmHighlightRules;
});
