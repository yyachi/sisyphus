var si = {};
(function() {
    si.app = {};

    var empty = {};
    function mixin(/*Object*/target, /*Object*/source) {
        var name, s, i;
        for (name in source) {
            s = source[name];
            if (!( name in target) || (target[name] !== s && (!( name in empty) || empty[name] !== s))) {
                target[name] = s;
            }
        }
        return target;
        // Object
    };
    si.mixin = function(/*Object*/obj, /*Object...*/props) {
        if (!obj) {
            obj = {};
        }
        for (var i = 1, l = arguments.length; i < l; i++) {
            mixin(obj, arguments[i]);
        }
        return obj;
        // Object
    };

    si.combine = function(/*Object*/obj, /*Object...*/props) {
        var newObj = {};
        for (var i = 0, l = arguments.length; i < l; i++) {
            mixin(newObj, arguments[i]);
        }
        return newObj;
    };

    var locale = Ti.Platform.locale;
    var osname = Ti.Platform.osname;

    /*
     Branching logic based on locale
     */
    si.locale = function(/*Object*/map) {
        var def = map.def || null;
        //default function or value
        if (map[locale]) {
            if ( typeof map[locale] == 'function') {
                return map[locale]();
            } else {
                return map[locale];
            }
        } else {
            if ( typeof def == 'function') {
                return def();
            } else {
                return def;
            }
        }
    };

    /*
     Branching logic based on OS
     */
    si.os = function(/*Object*/map) {
        var def = map.def || null;
        //default function or value
        if ( typeof map[osname] != 'undefined') {
            if ( typeof map[osname] == 'function') {
                return map[osname]();
            } else {
                return map[osname];
            }
        } else {
            if ( typeof def == 'function') {
                return def();
            } else {
                return def;
            }
        }
    };

    si.serverURL = function(){
        var _server = Ti.App.Properties.getString('server');
        var url = _server;
        if (_server.match(/^\w+:\/\//) == null) {
            url = 'http://' + url;
        }

        if (_server.match(/\/$/) == null) {
            url = url + '/';
        }
        return url;
    }


    si.imageURL = function(_path) {
        var server_url = si.serverURL();
        var url = si.parseURL(server_url);
        var hostname_with_port = url.protocol + '//' + url.hostname;
        if (url.port){
            hostname_with_port += ':' + url.port;
        }
        return hostname_with_port + _path;
    };

    si.authURL = function(_path) {
        var server_url = si.serverURL();
        var username = Ti.App.Properties.getString('username');
        var password = Ti.App.Properties.getString('password');
        var url = si.parseURL(server_url);
        var hostname_with_port = url.protocol + '//' + username + ':' + password + '@' + url.hostname;
        if (url.port){
            hostname_with_port += ':' + url.port;
        }
        return hostname_with_port + _path;
    };

    si.parseURL = function (href) {
        var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
        return match && {
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            search: match[6],
            hash: match[7]
        }
    };

})();

Ti.include(
    '/sisyphus/tibar.js', 
    '/sisyphus/ui/ui.js', 
    '/sisyphus/model/medusa.js',
    '/sisyphus/config/config.js'
    ); 