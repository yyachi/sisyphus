(function() {
    si.model = {};
    si.model.medusa = {};

    var CLASSNAME_STONE = 'Stone';
    var CLASSNAME_BOX = 'Box';
    var CLASSNAME_PLACE = 'Place';
    var CLASSNAME_ANALYSIS = 'Analysis';
    var CLASSNAME_BIB = 'Bib';
    var CLASSNAME_ATTACHMENT_FILE = 'AttachmentFile';
    var PATH_JSON = '.json';
    var PATH_RECORED = '/records';
    var PATH_STONE = '/stones';
    var PATH_BOX = '/boxes';
    var PATH_PLACE = '/places';
    var PATH_ANALYSIS = '/analyses';
    var PATH_BIB = '/bibs';
    var PATH_ATTACHMENT_FILE = '/attachment_files';
    var PATH_ATTACHMENT_FILE_JSON = PATH_ATTACHMENT_FILE + PATH_JSON;
    var PATH_DAUGHTERS = '/daughters';
    var PATH_UPLOAD_JSON = '/upload' + PATH_JSON;
    var PATH_RECORED_PROPERTY = '/record_property';
    var PATH_RECORED_PROPERTY_JSON = PATH_RECORED_PROPERTY + PATH_JSON;

    si.model.medusa.host = function() {
        var url = Ti.App.Properties.getString('server');
        var result = url.split('\/\/');
        var result2 = result[1].split('\/');
        var host = result2[0];
        return host;
    };

    si.model.medusa.getWithAuth = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(eval('(' + this.responseText + ')'));
            },
            onerror : function(e) {
                e.status = this.status;
                _args.onerror(e);
            },
            timeout : 30000 // in milliseconds
        });
        var url = Ti.App.Properties.getString('server') + _args.path;
        client.open('GET', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send(_args.args);
    };

    si.model.medusa.putWithAuth = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(eval('(' + this.responseText + ')'));
            },
            onerror : function(e) {
                e.status = this.status;
                _args.onerror(e);
            },
            timeout : 30000 // in milliseconds
        });
        var url = Ti.App.Properties.getString('server') + _args.path;
        client.open('PUT', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send(_args.args);
    };

    si.model.medusa.postWithAuth = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(eval('(' + this.responseText + ')'));
            },
            onerror : function(e) {
                e.status = this.status;
                _args.onerror(e);
            },
            timeout : 30000 // in milliseconds
        });
        var url = Ti.App.Properties.getString('server') + _args.path;
        client.open('POST', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send(_args.args);
    };

    si.model.medusa.getAccountInfo = function(_args) {
        si.model.medusa.getWithAuth({
            path : PATH_STONE + '/1' + PATH_JSON,
            username : _args.username,
            password : _args.password,
            onsuccess : _args.onsuccess,
            onerror : function(e) {
                if (e.status == 404) {
                    _args.onsuccess();
                } else {
                    _args.onerror();
                }
            },
        });
    };

    si.model.medusa.getRecordFromGlobalId = function(_args) {
        var record = {
            global_id : _args.global_id,
        };
        si.model.medusa.getWithAuth({
            args : _args.args,
            path : PATH_RECORED + '/' + _args.global_id + PATH_RECORED_PROPERTY_JSON,
            username : _args.username,
            password : _args.password,
            onerror : _args.onerror,
            onsuccess : function(response) {
                record.id = response.datum_id;
                record._className = response.datum_type;
                si.model.medusa.getWithAuth({
                    args : _args.args,
                    path : si.model.medusa.getClassPath(record) + '/' + record.id + PATH_JSON,
                    username : _args.username,
                    password : _args.password,
                    onerror : _args.onerror,
                    onsuccess : function(_response) {
                        record.name = _response.name;
                        si.model.medusa.getWithAuth({
                            args : _args.args,
                            path : si.model.medusa.getClassPath(record) + '/' + record.id + PATH_ATTACHMENT_FILE_JSON,
                            username : _args.username,
                            password : _args.password,
                            onerror : _args.onerror,
                            onsuccess : function(__response) {
                                record.image_path = '';
                                if (__response.length > 0) {
                                    attachmentFile = __response[0];
                                    record.image_path = '/system/attachment_files/' + attachmentFile.id + '/' + attachmentFile.data_file_name;
                                }
                                _args.onsuccess(record);
                            }
                        });
                    }
                });
            },
        });
    };

    si.model.medusa.getClassPath = function(_record) {
        var path = '';
        switch(_record._className) {
            case CLASSNAME_STONE:
                path = PATH_STONE;
                break;
            case CLASSNAME_BOX:
                path = PATH_BOX;
                break;
            case CLASSNAME_PLACE:
                path = PATH_PLACE;
                break;
            case CLASSNAME_ANALYSIS:
                path = PATH_ANALYSIS;
                break;
            case CLASSNAME_BIB:
                path = PATH_BIB;
                break;
            case CLASSNAME_ATTACHMENT_FILE:
                path = PATH_ATTACHMENT_FILE;
                break;
            default:
                throw new Error(_record._className + ' is not supported .');
        }
        return path;
    };

    si.model.medusa.getLinkPath = function(_parent, _child) {
        var path = '';
        path += si.model.medusa.getClassPath(_parent);
        path += '/' + _parent.id;
        ;

        if ((_parent._className == CLASSNAME_STONE) && (_child._className == CLASSNAME_STONE)) {
            path += PATH_DAUGHTERS;
        } else {
            path += si.model.medusa.getClassPath(_child);
        }
        path += '/' + _child.id;
        path += PATH_JSON;
        return path;
    };

    si.model.medusa.createLink = function(_parent, _child, _args) {
        si.model.medusa.putWithAuth({
            args : _args.args,
            path : si.model.medusa.getLinkPath(_parent, _child),
            username : _args.username,
            password : _args.password,
            onsuccess : function(response) {
                _args.onsuccess(response);
            },
            onerror : _args.onerror
        });
    };

    si.model.medusa.getImageUploadPath = function(_parent) {
        var path = '';
        switch(_parent._className) {
            case CLASSNAME_STONE:
                path += PATH_STONE + '/' + _parent.id;
                break;
            case CLASSNAME_BOX:
                path += PATH_BOX + '/' + _parent.id;
                break;
            case CLASSNAME_PLACE:
                path += PATH_PLACE + '/' + _parent.id;
                break;
            case CLASSNAME_ANALYSIS:
                path += PATH_ANALYSIS + '/' + _parent.id;
                break;
            case CLASSNAME_BIB:
                path += PATH_BIB + '/' + _parent.id;
                break;
            case CLASSNAME_ATTACHMENT_FILE:
                break;
            default:
                throw new Error(_parent._className + ' is not supported.');
        }
        path += PATH_ATTACHMENT_FILE;
        path += PATH_UPLOAD_JSON;

        return path;
    };

    si.model.medusa.uploadImage = function(_args) {
        si.model.medusa.postWithAuth({
            args : _args.args,
            path : si.model.medusa.getImageUploadPath(_args.record),
            username : _args.username,
            password : _args.password,
            onsuccess : function(response) {
                _args.onsuccess(response);
            },
            onerror : _args.onerror
        });
    };
})();
