// Generated by CoffeeScript 1.11.1
var Obj, RegEx;

Obj = require('../../lib.js.generic/dist/Obj');

RegEx = require('../../lib.js.generic/dist/RegEx');

module.exports.ArchPackages = (function() {
  var isPackageGroup;

  function ArchPackages(WM) {
    this.WM = WM;
    null;
  }

  ArchPackages.prototype.searchOfficialPackagesByExactName = function(name, call, callArgs) {
    var err, query;
    query = {
      method: "GET",
      url: "https://www.archlinux.org/packages/search/json/?name=" + encodeURIComponent(name),
      onload: function(res) {
        var err, json;
        try {
          if (Obj.getFirstItem(res.responseJSON)) {
            json = res.responseJSON;
          } else {
            json = JSON.parse(res.responseText);
          }
        } catch (error) {
          err = error;
          this.WM.Log.logError("The Official Repositories web interface returned an unexpected object");
        }
        if (json) {
          return call(json, callArgs);
        }
      },
      onerror: function(res) {
        return this.WM.Log.logError(this.WM.MW.failedQueryError(res.finalUrl));
      }
    };
    try {
      return GM_xmlhttpRequest(query);
    } catch (error) {
      err = error;
      return this.WM.Log.logError(this.WM.MW.failedHTTPRequestError(err));
    }
  };

  ArchPackages.prototype.isOfficialPackage = function(pkg, call, callArgs) {
    var call2;
    call2 = function(res, args) {
      if (res.results.length) {
        return call(true, args);
      } else {
        return call(false, args);
      }
    };
    return this.WM.ArchPackages.searchOfficialPackagesByExactName(pkg, call2, callArgs);
  };

  ArchPackages.prototype.getAURInfo = function(arg, call, callArgs) {
    var err, query;
    query = {
      method: "GET",
      url: "https://aur.archlinux.org/rpc.php?type=info&arg=" + encodeURIComponent(arg),
      onload: function(res) {
        var err, json;
        try {
          if (Obj.getFirstItem(res.responseJSON)) {
            json = res.responseJSON;
          } else {
            json = JSON.parse(res.responseText);
          }
        } catch (error) {
          err = error;
          this.WM.Log.logError("The AUR's RPC interface returned an unexpected object");
        }
        if (json) {
          return call(json, callArgs);
        }
      },
      onerror: function(res) {
        return this.WM.Log.logError(this.WM.MW.failedQueryError(res.finalUrl));
      }
    };
    try {
      return GM_xmlhttpRequest(query);
    } catch (error) {
      err = error;
      return this.WM.Log.logError(this.WM.MW.failedHTTPRequestError(err));
    }
  };

  ArchPackages.prototype.isAURPackage = function(pkg, call, callArgs) {
    var call2;
    call2 = function(res, args) {
      if (res.type === "error") {
        return this.WM.Log.logError("The AUR's RPC interface returned an error: " + res.results);
      } else {
        if (res.resultcount > 0) {
          return call(true, args);
        } else {
          return call(false, args);
        }
      }
    };
    return this.WM.ArchPackages.getAURInfo(pkg, call2, callArgs);
  };

  isPackageGroup = function(arch, grp, call, callArgs) {
    var err, query;
    query = {
      method: "GET",
      url: "https://www.archlinux.org/groups/" + encodeURIComponent(arch) + "/" + encodeURIComponent(grp),
      onload: function(res) {
        var escarch, escgrp, regExp;
        escgrp = RegEx.escapePattern(grp);
        escarch = RegEx.escapePattern(arch);
        regExp = new RegExp("<h2>\\s*Group Details -\\s*" + escgrp + "\\s*\\(" + escarch + "\\)\\s*</h2>", "");
        if (res.responseText.search(regExp) > -1) {
          return call(true, callArgs);
        } else {
          return call(false, callArgs);
        }
      },
      onerror: function(res) {
        return this.WM.Log.logError(this.WM.MW.failedQueryError(res.finalUrl));
      }
    };
    try {
      return GM_xmlhttpRequest(query);
    } catch (error) {
      err = error;
      return this.WM.Log.logError(this.WM.MW.failedHTTPRequestError(err));
    }
  };

  ArchPackages.prototype.isPackageGroup64 = function(grp, call, callArgs) {
    return isPackageGroup('x86_64', grp, call, callArgs);
  };

  ArchPackages.prototype.isPackageGroup32 = function(grp, call, callArgs) {
    return isPackageGroup('i686', grp, call, callArgs);
  };

  return ArchPackages;

})();
