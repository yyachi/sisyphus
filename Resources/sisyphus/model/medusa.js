(function() {
    si.model = {};
    si.model.medusa = {};

    si.model.medusa.host = function() {
        var url = si.config.Medusa.server;
        var result = url.split('\/\/');
        var result2 = result[1].split('\/');
        var host = result2[0];
        return host;
    };

    si.model.medusa.getWithAuth = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(this.responseText);
              },
            onerror : _args.onerror,
            timeout : 30000 // in milliseconds
        });
        var url = si.config.Medusa.server + _args.path;
        client.open('GET', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send();
    };

    si.model.medusa.putWithAuth = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(this.responseText);
            },
            onerror : _args.onerror,
            timeout : 30000 // in milliseconds
        });
        var url = si.config.Medusa.server + _args.path;
        client.open('PUT', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send();
    };

    si.model.medusa.getAccountInfo = function(_args) {
        si.model.medusa.getWithAuth({
            path : '/main/info.json',
            username : _args.username,
            password : _args.password,
            onsuccess : function(response) {
                var prop = eval('(' + response + ')');
                if (prop) {
                    _args.onsuccess(prop);
                } else {
                    _args.onerror(response);
                }
            },
            onerror : _args.onerror
        });
    };

    si.model.medusa.getRecordFromGlobalId = function(_args) {
       si.model.medusa.getWithAuth({
            path : '/records.json?global_id=' + _args.global_id,
            username : _args.username,
            password : _args.password,
            onsuccess : function(response) {
                var prop = eval('(' + response + ')');
                if (prop) {
                    _args.onsuccess(prop);
                } else {
                    _args.onerror(response);
                }
            },
            onerror : _args.onerror
        });
    };

    si.model.medusa.getLinkPath = function(_parent, _child){
       var parent_path = '';
        switch(_parent._className) {
            case 'Stone':
                parent_path = '/stones/';
                break;
            case 'Box':
                parent_path = '/boxes/';
                break;
            case 'Attachment_file':
                parent_path = '/attachment_files/';
                break;
            default:
                throw new Error(_parent._className + ' is not supported for parent.');
         }
        parent_path += _parent.id;
        
        var child_path = '';
        switch(_child._className) {
            case 'Stone':
                if (_parent._className == 'Stone'){
                    child_path = '/daughters/';
                }else{
                    child_path = '/stones/';
                }
                break;
            case 'Box':
                child_path = '/boxes/';
                break;
            case 'Attachment_file':
                child_path = '/attachment_files/';
                break;
            default:
                throw new Error(_child._className + ' is not supported for child.');
        }
        child_path += _child.id;        
        
        return parent_path + child_path + '.json';
    };

    si.model.medusa.createLink = function(_parent, _child, _args) {
        si.model.medusa.putWithAuth({
            path : si.model.medusa.getLinkPath(_parent,_child),
            username : _args.username,
            password : _args.password,
            onsuccess : function(response) {
                _args.onsuccess(response);
            },
            onerror : _args.onerror
        });
    };
    
    si.model.medusa.getImageUploadPath = function(_parent){
        var path = '';
        switch(_parent._className) {
            case 'Stone':
                path += '/stones/' + _parent.id + '/attachment_files';
                break;
            case 'Box':
                path += '/boxes/' + _parent.id + '/attachment_files';
                break;
            case 'Attachment_file':
                path += '/attachment_files';
                break;
            default:
                throw new Error(_parent._className + ' is not supported for parent.');
         }       
         path += '/upload.json';
        
        return path;
    };
    
    si.model.medusa.uploadImage = function(_args) {
        var client = Ti.Network.createHTTPClient({
            onload : function() {
                _args.onsuccess(this.response);
            },
            onerror : _args.onerror,
            timeout : 2400000 // in milliseconds
        });
        var url = si.config.Medusa.server + si.model.medusa.getImageUploadPath(_args.record);
        client.open('POST', url);
        var auth_text = 'Basic ' + Ti.Utils.base64encode(_args.username + ':' + _args.password);
        client.setRequestHeader('Authorization', auth_text);
        client.send({media : _args.image});
    };
})();
