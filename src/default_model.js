defaultModel = {
    embedded: false,
    input: "",
    automatonText: "// DFA recognizing { x in {0,1}* | x does not end in 000 }\n\nstates = {q,         // last bit was a 1 or non-existent\n          q0,        // last two bits were 10\n          q00,       // last three bits were 100\n          q000}      // last three bits were 000\n\ninput_alphabet = {0,1}\n\n// no last bit when we start\nstart_state =    q\n\n// accept if last three bits were not 000\naccept_states =  {q,q0,q00}\n\ndelta =\n    // if we see a 1, reset\n    q,1    -> q;\n    q0,1   -> q;\n    q00,1  -> q;\n    q000,1 -> q;\n\n    // if we see a 0, count one more 0 than before\n    q,0   -> q0;\n    q0,0  -> q00;\n    q00,0 -> q000;\n\n    // until we get to three\n    q000,0 -> q000;\n",
    automatonTypeString: "dfa",
    editorOptions: {
        runImmediately: true,
        theme: "twilight",
        themes: [
            "chrome",
            "clouds",
            "crimson_editor",
            "dawn",
            "dreamweaver",
            "eclipse",
            "github",
            "iplastic",
            "solarized_light",
            "textmate",
            "tomorrow",
            "xcode",
            "kuroir",
            "katzenmilch",
            "sqlserver",
            "ambiance",
            "chaos",
            "clouds_midnight",
            "cobalt",
            "gruvbox",
            "gob",
            "idle_fingers",
            "kr_theme",
            "merbivore",
            "merbivore_soft",
            "mbo",
            "mono_industrial",
            "monokai",
            "pastel_on_dark",
            "solarized_dark",
            "terminal",
            "tomorrow_night",
            "tomorrow_night_blue",
            "tomorrow_night_bright",
            "tomorrow_night_eighties",
            "twilight",
            "vibrant_ink"]
    }
};
