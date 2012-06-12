WM.Plugins.ArchWikiFixHeader = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        
        var detLang = WM.ArchWiki.detectLanguage(WM.Editor.getTitle());
        var pureTitle = detLang[0];
        var language = detLang[1];
        
        var header = "";
        var content = source;
        
        // <noinclude>
        var content = content.replace(/^\s*<noinclude>/, "");
        if (content != source) {
            header += "<noinclude>\n";
        }
        
        // DISPLAYTITLE and Template:Lowercase_title
        var displaytitle = WM.Parser.findVariables(content, "DISPLAYTITLE");
        var lowercasetitle = WM.Parser.findTemplates(content, "Lowercase title");
        var titlemods = displaytitle.concat(lowercasetitle);
        titlemods.sort(function (a, b) {
            return a.index - b.index;
        });
        var tempcontent = "";
        var contentId = 0;
        for (var t in titlemods) {
            tempcontent += content.substring(contentId, titlemods[t].index);
            contentId = titlemods[t].index + titlemods[t].length;
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        var dt = displaytitle.pop();
        var lct = lowercasetitle.pop();
        var dlct = "";
        if (dt && !lct) {
            var dlct = "{{DISPLAYTITLE:" + dt.match[2] + "}}";
        }
        else if (!dt && lct) {
            var dlct = "{{Lowercase title}}";
        }
        else if (dt && lct) {
            var dlct = (dt.index < lct.index) ? "{{Lowercase title}}" : "{{DISPLAYTITLE:" + dt.match[2] + "}}";
        }
        if (displaytitle.length || lowercasetitle.length) {
            WM.Log.logWarning("Found multiple instances of {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last one has been used, the others have been deleted");
        }
        
        // Behavior switches
        var behaviorswitches = WM.Parser.findBehaviorSwitches(content);
        var bslist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var b in behaviorswitches) {
            var bs = behaviorswitches[b].match[1];
            if (bs == "TOC" || bs == "START" || bs == "END") {
                behaviorswitches.splice(b, 1);
            }
            else {
                if (bslist.indexOf(behaviorswitches[b].match[0]) == -1) {
                    bslist.push(behaviorswitches[b].match[0]);
                }
                else {
                    WM.Log.logWarning("Removed duplicate of " + behaviorswitches[b].match[0]);
                }
                tempcontent += content.substring(contentId, behaviorswitches[b].index);
                contentId = behaviorswitches[b].index + behaviorswitches[b].length;
            }
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        if (!dlct && bslist.length) {
            header += bslist.join(" ") + "\n";
        }
        else if (dlct && !bslist.length) {
            header += dlct + "\n";
        }
        else if (dlct && bslist.length) {
            header += dlct + " " + bslist.join(" ") + "\n";
        }
        
        // Categories
        var categories = WM.Parser.findCategories(content);
        var catlist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var c in categories) {
            var cat = categories[c];
            var catlang = WM.ArchWiki.detectLanguage(cat.match[1])[1];
            if (language != catlang) {
                WM.Log.logWarning(cat.match[1] + " belongs to a different language than the one of the title (" + language + ")");
            }
            if (catlist.indexOf(cat.match[0]) == -1) {
                catlist.push(cat.match[0]);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + cat.match[1]);
            }
            tempcontent += content.substring(contentId, cat.index);
            contentId = cat.index + cat.length;
        }
        if (catlist.length) {
            header += catlist.join("\n") + "\n";
        }
        else {
            WM.Log.logWarning("The article is not categorized");
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        // Interlanguage links
        var interlanguage = WM.ArchWiki.findAllInterlanguageLinks(content);
        var iwlist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var l in interlanguage) {
            var link = interlanguage[l];
            if (iwlist.indexOf(link.match[0]) == -1) {
                iwlist.push(link.match[0]);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + link.match[1]);
            }
            tempcontent += content.substring(contentId, link.index);
            contentId = link.index + link.length;
        }
        if (iwlist.length) {
            iwlist.sort();
            header += iwlist.join("\n") + "\n";
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        // Template:i18n
        var i18ns = WM.Parser.findTemplates(content, "i18n");
        var i18n = i18ns.shift();
        if (i18ns.length) {
            WM.Log.logWarning("Found multiple instances of Template:i18n : only the first one has been used, the others have been ignored");
        }
        if (i18n) {
            var parsedTitle = WM.Parser.convertUnderscoresToSpaces(i18n.arguments[0].value);
            var test1 = pureTitle.substr(0, 1).toLowerCase() != parsedTitle.substr(0, 1).toLowerCase();
            var test2 = pureTitle.substr(1) != parsedTitle.substr(1);
            
            if (test1 || test2) {
                header += "{{i18n|" + pureTitle + "}}";
                WM.Log.logWarning("Updated Template:i18n since it wasn't matching the current article title");
            }
            else {
                header += "{{i18n|" + parsedTitle + "}}";
            }
            content = Alib.Str.removeFor(content, i18n.index, i18n.length);
        }
        else {
            header += "{{i18n|" + pureTitle + "}}";
            WM.Log.logInfo("Added Template:i18n");
        }
        header += "\n\n";
        
        var firstChar = content.search(/[^\s]/);
        content = content.substr(firstChar);
        
        var newText = header + content;
        
        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Fixed header");
        }
        
        if (callNext) {
            callNext();
        }
    };
};