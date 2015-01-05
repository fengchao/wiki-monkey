// ==UserScript==
// @id wiki-monkey-archwikibot
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.16.1-dev-archwikibot
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-archwikibot.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-archwikibot.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Async.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Compatibility.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/CSS.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/DOM.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/HTTP.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Obj.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/RegEx.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/ArchPackages.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Filters.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiFixLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiNPFilter.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiOldAURLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiRCFilter.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiSummaryToRelated.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiUpdatePackageTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixBacklinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixDoubleRedirects.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixLinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/SynchronizeInterlanguageLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiFixLinks", "Fix external links", null],
        ["FixFragments", "Fix section links", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null],
        ["ArchWikiSummaryToRelated", "Convert summary to related", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null],
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links"],
        ["ArchWikiOldAURLinks", "Fix old AUR links", null],
        ["ArchWikiUpdatePackageTemplates", "Update package templates", null]
    ]
]);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setSpecial([
    [
        ["UpdateCategoryTree", "Update category tree",
         [[{page: "Table of contents",
            root: "Category:English",
            alsoIn: "also in",
            indentType: ":",
            replace: null,
            keepAltName: false,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (العربية)",
            root: "Category:العربية",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(العربية\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: true},
           {page: "Table of Contents (Български)",
            root: "Category:Български",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Български\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Česky)",
            root: "Category:Česky",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Česky\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Dansk)",
            root: "Category:Dansk",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Dansk\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Ελληνικά)",
            root: "Category:Ελληνικά",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Ελληνικά\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of contents (Español)",
            root: "Category:Español",
            alsoIn: "también en",
            indentType: ":",
            replace: ["[ _]\\(Español\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (עברית)",
            root: "Category:עברית",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(עברית\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: true},
           {page: "Table of Contents (Hrvatski)",
            root: "Category:Hrvatski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Hrvatski\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Magyar)",
            root: "Category:Magyar",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Magyar\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Indonesia)",
            root: "Category:Indonesia",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Indonesia\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Italiano)",
            root: "Category:Italiano",
            alsoIn: "anche in",
            indentType: ":",
            replace: ["[ _]\\(Italiano\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (日本語)",
            root: "Category:日本語",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(日本語\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (한국어)",
            root: "Category:한국어",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(한국어\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Lietuviškai)",
            root: "Category:Lietuviškai",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Lietuviškai\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Nederlands)",
            root: "Category:Nederlands",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Nederlands\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Polski)",
            root: "Category:Polski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Polski\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Português)",
            root: "Category:Português",
            alsoIn: "também em",
            indentType: ":",
            replace: ["[ _]\\(Português\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of contents (Русский)",
            root: "Category:Русский",
            alsoIn: "Также в",
            indentType: ":",
            replace: ["[ _]\\(Русский\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Slovenský)",
            root: "Category:Slovenský",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Slovenský\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Српски)",
            root: "Category:Српски",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Српски\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (ไทย)",
            root: "Category:ไทย",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(ไทย\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Українська)",
            root: "Category:Українська",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Українська\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (简体中文)",
            root: "Category:简体中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(简体中文\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (正體中文)",
            root: "Category:正體中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(正體中文\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false}],
         "automatic update"]]
    ],
    [
        ["FixDoubleRedirects", "Fix double redirects", "fix double redirect"]
    ]
]);

WM.UI.setRecentChanges([
    [
        "ArchWikiRCFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setNewPages([
    [
        "ArchWikiNPFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setBot([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["FixBacklinkFragments",
                        "Fix links to specific sections of a target page",
                        "fix links to specific sections"],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     "synchronized interlanguage links with the other wikis"],
    ["ArchWikiUpdatePackageTemplates",
                "Check packages linked with Pkg/AUR templates " +
                "and possibly update them",
                ["update Pkg/AUR templates to reflect new package status"]],
    ["ArchWikiOldAURLinks",
            "Replace old-style direct AUR package links with Template:AUR",
            ["replace old-style direct package links with Pkg/AUR templates"]]
]);

WM.main();