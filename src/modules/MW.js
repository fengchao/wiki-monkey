/*
 *  Wiki Monkey - Perform automatic actions when editing wiki pages.
 *  Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.com>
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

WM.MW = new function () {
    this.callAPIGet = function (params) {
        var id = WM.HTTP.sendGetSyncRequest(WM.getBaseURL() + "api.php?format=xml&" + params.join('&'));
        var parser = new DOMParser();
        return parser.parseFromString(WM.HTTP.getResponseText(id), "text/xml");
    };
    
    this.callAPIPost = function (params) {
        var id = WM.HTTP.sendPostSyncRequest(WM.getBaseURL() + "api.php", "format=xml&" + params.join('&'), "Content-type", "application/x-www-form-urlencoded");
        var parser = new DOMParser();
        return parser.parseFromString(WM.HTTP.getResponseText(id), "text/xml");
    };
    
    var userName;
    
    this.getUserName = function () {
        if (!userName) {
            userName = this.callAPIGet(["action=query", "meta=userinfo"]
                    ).getElementsByTagName('userinfo')[0].getAttribute('name');
        }
        return userName;
    };
};
