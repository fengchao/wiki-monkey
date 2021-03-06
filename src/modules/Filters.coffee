# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

$ = require('jquery')
CSS = require('../../lib.js.generic/dist/CSS')


class module.exports.Filters
    constructor: (@WM) ->

    _makeUI: (plugins) ->
        CSS.addStyleElement("#WikiMonkeyFilters-Select,
                    #WikiMonkeyFilters-Apply {float:left;}
                    #WikiMonkeyFilters-Select {width:100%;
                        margin-right:-16em;}
                    #WikiMonkeyFilters-Select > p {margin:0 17em 0 0;}
                    #WikiMonkeyFilters-Select > p > select {width:100%;}
                    #WikiMonkeyFilters-Apply > input[type='button']
                        {margin-right:1em;}
                    #WikiMonkeyFilters-Apply > input[type='checkbox']
                        {margin-right:0.4em;}
                    #WikiMonkeyFilters-Options {clear:both;}")

        filters = []
        selectFilter = $('<select/>').change(@updateFilterUI(filters))

        for pid of plugins
            pluginConf = plugins[pid]
            pluginName = pluginConf[0]
            pluginInst = pluginConf[1]

            # This protects from configurations that define plugins
            # that are actually not installed
            # A try-catch doesn't work...
            if not @WM.Plugins[pluginName]
                continue

            # This allows to disable an entry by giving it any second
            # parameter that evaluates to false
            if not pluginInst or not pluginInst.length
                continue

            filters.push(pluginConf)
            $('<option/>').text(pluginInst[pluginInst.length - 1])
                                                .appendTo(selectFilter)

        if filters.length
            applyFilterDiv = $('<div/>')
                .attr('id', 'WikiMonkeyFilters-Apply')

            $('<input/>')
                .attr('type', 'button')
                .val('Apply filter')
                .click(@executePlugin(filters))
                .appendTo(applyFilterDiv)

            $('<input/>')
                .attr('type', 'checkbox')
                .change(@toggleLog)
                .appendTo(applyFilterDiv)

            $('<span/>')
                .text('Show Log')
                .appendTo(applyFilterDiv)

            divFilter = $('<div/>')
                .attr('id', "WikiMonkeyFilters-Options")

            # This allows updateFilterUI replace it the first time
            $('<div/>').appendTo(divFilter);
            @doUpdateFilterUI(divFilter, filters, 0)

            selectFilterP = $('<p/>').append(selectFilter)

            selectFilterDiv = $('<div/>')
                .attr('id', 'WikiMonkeyFilters-Select')
                .append(selectFilterP)

            div = $('<div/>')
                .attr('id', 'WikiMonkeyFilters')
                .append(selectFilterDiv)
                .append(applyFilterDiv)
                .append(divFilter)
            return div[0]
        else
            return false

    updateFilterUI: (filters) =>
        self = this
        return (event) ->
            UI = $('#WikiMonkeyFilters-Options')
            select = $('#WikiMonkeyFilters-Select')
                .find('select')
                .first()
            id = select[0].selectedIndex

            self.doUpdateFilterUI(UI, filters, id)

    doUpdateFilterUI: (UI, filters, id) ->
        makeUI = @WM.Plugins[filters[id][0]].makeUI

        if makeUI instanceof Function
            UI.children().first().replaceWith(makeUI(filters[id][2]))
        else
            # Don't remove, otherwise if another plugin with interface is
            # selected, replaceWith won't work
            UI.children().first().replaceWith($('<div/>'))

    executePlugin: (filters) =>
        self = this
        return (event) ->
            select = $('#WikiMonkeyFilters-Select')
                .find('select')
                .first()
            id = select[0].selectedIndex

            self.WM.Plugins[filters[id][0]].main(filters[id][2])

            this.disabled = true

    toggleLog: (event) ->
        if @checked
            $('#WikiMonkeyLog').show()
        else
            $('#WikiMonkeyLog').hide()
