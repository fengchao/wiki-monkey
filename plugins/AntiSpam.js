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

WM.Plugins.AntiSpam = new function () {
    "use strict";

    // TODO: Turn into a standard plugin
    
    var SEARCH_DAYS = 2;

    this.makeUI = function () {
        Alib.CSS.addStyleElement("#WikiMonkey-AntiSpam " + 
                                                "{margin-bottom:0.67em;}");
       
        return $('<div/>')
            .append($("<input/>")
                .attr("type", "button")
                .val("Enable nuke")
                .click(enable))
            .attr("id", "WikiMonkey-AntiSpam");
    };
    
    var enable = function () {
        $('span.mw-usertoollinks').each(function () {
            $(this).contents()
                .last()
                .before($(document.createTextNode(' | ')))
                .before($('<a/>')
                    .text('nuke')
                    .attr('href', '#')
                    .click(function () {
                        nukeUser($(this).parent().prev('a').text());
                        return false;
                    })
                )
            })
    };

    var nukeUser = function (username) {
        WM.Log.logInfo('Blocking ' + username + ' ...');

        var callBack = function (res, username) {
           WM.Log.logInfo('User ' + username + ' blocked');
        };
        var callError = function (username) {
            WM.Log.logWarning('User ' + username + ' could not be blocked');
        };
        this.callAPIGet({action: 'block',
                         user: username,
                         expiry: 'never',
                         reason: 'spamming',
                         nocreate: '1',
                         autoblock: '1',
                         noemail: '1',
                         allowusertalk: '0',
                         token: token // *********************************************************
                        }, null, callBack, username, callError);

        var date = new Date();
        var ucstart = Math.floor(Date.now() / 1000);
        var ucend = ucstart - 86400 * SEARCH_DAYS;
        WM.MW.getUserContribs(username, 'title', ucstart, ucend, 'new',
                                        WM.AntiSpam._deleteNewPages,
                                        [username, ucstart, ucend]);
    };

    this._deleteNewPages = function (res, args) {
        var username = args[0];
        var ucstart = args[1];
        var ucend = args[2];

        WM.Log.logDebug('Deleting new pages by User:' + username + ' ...\n' + JSON.stringify(res));  // *************

        var callBack = function (res, title) {
           WM.Log.logInfo('Page ' + title + ' deleted');  // *****************************************
        };
        var callError = function (title) {
            WM.Log.logWarning('Page ' + title + ' could not be deleted');  // ****************
        };
        WM.MW.callAPIGet({action: 'delete',
                          title: title, // ***************************************************
                          reason: 'spam',
                          token: token  // ***************************************************
                         }, null, callBack, title, callError);

        WM.MW.getUserContribs(username, 'title', ucstart, ucend, '!new',
                                        WM.AntiSpam._rollbackEdits, username);
    };

    this._rollbackEdits = function (res, username) {
        WM.Log.logDebug('Rolling back User:' + username + '\'s changes ...\n' + JSON.stringify(res));  // *************

        var callBack = function (res, title) {
           WM.Log.logInfo('Page ' + title + ' rolled back');  // *****************************************
        };
        var callError = function (title) {
            WM.Log.logWarning('Page ' + title + ' could not be rolled back');  // ****************
        };
        WM.MW.callAPIGet({action: 'rollback',
                          title: title, // ***************************************************
                          user: username,
                          summary: 'revert spam',
                          token: token  // ***************************************************
                         }, null, callBack, title, callError);
    };
};
