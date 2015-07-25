/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

var WM = new function () {
    "use strict";

    this.Plugins = {};

    this.main = function (defaultConfig) {
        WM.Cfg._load(defaultConfig);
        WM.UI._makeUI();

        // ******************************************************************************
        var ss = document.scripts;
        var re = new RegExp("^\\s*if\\s*\\(\\s*window\\.mw\\s*\\)\\s*\\{" +
                       "\\s*mw\\.config\\.set\\(\\s*(.+)\\s*\\)\\s*;?\\s*" +
                       "\\}\\s*$", "m");

        for (var s = 0; s < ss.length; s++) {
            var script = document.scripts[s];
            var match = re.exec(script.innerHTML);

            if (match) {
                var mwInfo = JSON.parse(match[1]);

                for (var key in mwInfo) {
                    WM.Log.logDebug(key + ": " + mwInfo[key]);
                }

                break;
            }
        }
        // ******************************************************************************
    };
};
