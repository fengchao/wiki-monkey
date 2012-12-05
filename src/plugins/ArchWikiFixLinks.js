WM.Plugins.ArchWikiFixLinks = new function () {
    var doReplace = function (txt) {
        // archlinux.org HTTP -> HTTPS
        
        var re = /http:\/\/([a-z]+\.)?archlinux\.org(?!\.[a-z])/ig;
        txt = txt.replace(re, 'https://$1archlinux.org');
        
        // wiki.archlinux.org -> Internal link
        
        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/(.+?) (.+?)\]/ig;
        txt = txt.replace(re, '[[$1|$2]]');
        
        re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/(.+?)\]/ig;
        txt = txt.replace(re, '[[$1]]');
        
        re = /https?:\/\/wiki\.archlinux\.org\/index\.php\/([^\s]+)/ig;
        txt = txt.replace(re, '[[$1]]');
        
        re = /https?:\/\/wiki\.archlinux\.org(?!\.)/ig;
        
        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to wiki.archlinux.org");
        }
        
        // Wikipedia -> wikipedia: interlink
        
        re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?) (.+?)\]/ig;
        txt = txt.replace(re, '[[wikipedia:$1|$2]]');
        
        re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?)\]/ig;
        txt = txt.replace(re, '[[wikipedia:$1]]');
        
        re = /https?:\/\/en\.wikipedia\.org\/wiki\/([^\s]+)/ig;
        txt = txt.replace(re, '[[wikipedia:$1]]');
        
        re = /https?:\/\/([a-z]+?)\.wikipedia\.org(?!\.)/ig;
        
        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to Wikipedia");
        }
        
        // Official package links -> Pkg template
        
        re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{Pkg|$1}}');
        
        re = /(?:[^\[])https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{Pkg|$1}}');
        
        re = /https?:\/\/(?:www\.)?archlinux\.org\/packages/ig;
        
        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to archlinux.org/packages");
        }
        
        // AUR package links -> AUR template
        
        re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{AUR|$1}}');
        
        re = /(?:[^\[])https?:\/\/aur\.archlinux\.org\/packages\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{AUR|$1}}');
        
        re = /https?:\/\/aur\.archlinux\.org(?!\.)/ig;
        
        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to aur.archlinux.org (try the \"Fix old AUR links\" function, if installed)");
        }
        
        // Bug links -> Bug template
        
        re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/?\]/ig;
        txt = txt.replace(re, '{{Bug|$1}}');
        
        re = /(?:[^\[])https?:\/\/bugs\.archlinux\.org\/task\/([^\s\/]+)\/?/ig;
        txt = txt.replace(re, '{{Bug|$1}}');
        
        re = /https?:\/\/bugs\.archlinux\.org(?!\.)/ig;
        
        if (re.test(txt)) {
            WM.Log.logWarning("It hasn't been possible to convert some links to bugs.archlinux.org");
        }
        
        return txt;
    };
    
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = doReplace(source);
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed links");
        }
        else {
            WM.Log.logInfo("No fixable links found");
        }
        
        if (callNext) {
            callNext();
        }
    };
    
    /*
     * Note that it's too dangerous to use this plugin with the bot, in fact
     * some full URLs are correctly used in code blocks (e.g. wget lines)
     */
};
