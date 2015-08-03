// ==UserScript==
// @id wiki-monkey-archwikipatrollite
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.17.3-archwiki
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (ArchWiki version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.17.3/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.17.3/auxiliary/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.17.3/scripts/WikiMonkey-ArchWiki.include.js
// ==/UserScript==

WM.main({
    "Mods": {
        "Editor": {
            "disable_edit_summary_submit_on_enter": true
        }
    },
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                null,
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                null,
                "fix links to specific sections"
            ],
            "030IL": [
                "SynchronizeInterlanguageLinks",
                null,
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    "synchronized interlanguage links with the other wikis"
                ]
            ],
            "040APT": [
                "ArchWikiUpdatePackageTemplates",
                null,
                "update Pkg/AUR templates to reflect new package status"
            ],
            "050AAL": [
                "ArchWikiOldAURLinks",
                null,
                "replace old-style direct package links with Pkg/AUR templates"
            ]
        },
        "Diff": {
            "010AQR": [
                "ArchWikiQuickReport",
                [
                    "Quick report"
                ],
                [
                    "ArchWiki:Reports",
                    "add report"
                ]
            ]
        },
        "Editor": {
            "010AHE": [
                "ArchWikiFixHeader",
                null,
                null
            ],
            "020ASE": [
                "ArchWikiFixHeadings",
                null,
                null
            ],
            "030AEL": [
                "ArchWikiFixLinks",
                null,
                null
            ],
            "040SL": [
                "FixFragments",
                null,
                null
            ],
            "050ACT": [
                "ArchWikiNewTemplates",
                null,
                null
            ],
            "060EC": [
                "ExpandContractions",
                null,
                null
            ],
            "070ML": [
                "MultipleLineBreaks",
                null,
                null
            ],
            "080ASR": [
                "ArchWikiSummaryToRelated",
                null,
                null
            ],
            "110SR": [
                "SimpleReplace",
                null,
                null
            ],
            "210ES": [
                "FixLinkFragments",
                null,
                null
            ],
            "220AIL": [
                "SynchronizeInterlanguageLinks",
                null,
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    null
                ]
            ],
            "230AAL": [
                "ArchWikiOldAURLinks",
                null,
                null
            ],
            "240APT": [
                "ArchWikiUpdatePackageTemplates",
                null,
                null
            ]
        },
        "NewPages": {
            "010ANP": [
                "ArchWikiNPFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "RecentChanges": {
            "010ARC": [
                "ArchWikiRCFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "Special": {
            "010CTar": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "ar"
                    ],
                    "automatic update"
                ]
            ],
            "010CTbg": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "bg"
                    ],
                    "automatic update"
                ]
            ],
            "010CTcs": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "cs"
                    ],
                    "automatic update"
                ]
            ],
            "010CTda": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "da"
                    ],
                    "automatic update"
                ]
            ],
            "010CTel": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "el"
                    ],
                    "automatic update"
                ]
            ],
            "010CTen": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "en"
                    ],
                    "automatic update"
                ]
            ],
            "010CTes": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "es"
                    ],
                    "automatic update"
                ]
            ],
            "010CThe": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "he"
                    ],
                    "automatic update"
                ]
            ],
            "010CThr": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "hr"
                    ],
                    "automatic update"
                ]
            ],
            "010CThu": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "hu"
                    ],
                    "automatic update"
                ]
            ],
            "010CTid": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "id"
                    ],
                    "automatic update"
                ]
            ],
            "010CTit": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "it"
                    ],
                    "automatic update"
                ]
            ],
            "010CTko": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "ko"
                    ],
                    "automatic update"
                ]
            ],
            "010CTlt": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "lt"
                    ],
                    "automatic update"
                ]
            ],
            "010CTnl": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "nl"
                    ],
                    "automatic update"
                ]
            ],
            "010CTpl": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "pl"
                    ],
                    "automatic update"
                ]
            ],
            "010CTpt": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "pt"
                    ],
                    "automatic update"
                ]
            ],
            "010CTru": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "ru"
                    ],
                    "automatic update"
                ]
            ],
            "010CTsk": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "sk"
                    ],
                    "automatic update"
                ]
            ],
            "010CTsr": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "sr"
                    ],
                    "automatic update"
                ]
            ],
            "010CTth": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "th"
                    ],
                    "automatic update"
                ]
            ],
            "010CTuk": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "uk"
                    ],
                    "automatic update"
                ]
            ],
            "010CTzhcn": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "zh-cn"
                    ],
                    "automatic update"
                ]
            ],
            "010CTzhtw": [
                "UpdateCategoryTree",
                null,
                [
                    [
                        "ArchWiki",
                        "zh-tw"
                    ],
                    "automatic update"
                ]
            ],
            "020DR": [
                "FixDoubleRedirects",
                null,
                "fix double redirect"
            ]
        }
    }
});
