// Generated by CoffeeScript 1.11.1
module.exports.ArchWikiFixHeadings = (function() {
  ArchWikiFixHeadings.REQUIRES_GM = false;

  function ArchWikiFixHeadings(WM) {
    this.WM = WM;
  }

  ArchWikiFixHeadings.prototype.main = function(args, callNext) {
    var i, increaseLevel, info, len, newtext, prevId, ref, section, source;
    source = this.WM.Editor.readSource();
    info = this.WM.Parser.findSectionHeadings(source);
    if (this.WM.Editor.isSection()) {
      increaseLevel = info.minLevel - 1;
    } else {
      if (info.maxTocLevel < 6) {
        increaseLevel = 1;
      } else {
        increaseLevel = 0;
        this.WM.Log.logWarning("There are 6 levels of headings, it has been necessary to start creating them from level 1 although usually it is suggested to start from level 2");
      }
    }
    newtext = "";
    prevId = 0;
    ref = info.sections;
    for (i = 0, len = ref.length; i < len; i++) {
      section = ref[i];
      newtext += source.substring(prevId, section.index);
      newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
      newtext += section.rawheading;
      newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
      prevId = section.index + section.length0;
    }
    newtext += source.substr(prevId);
    if (newtext !== source) {
      this.WM.Editor.writeSource(newtext);
      this.WM.Log.logInfo("Fixed section headings");
    }
    if (callNext) {
      return callNext();
    }
  };

  return ArchWikiFixHeadings;

})();
