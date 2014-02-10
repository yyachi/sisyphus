(function() {
    si.ui.createNewStoneWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'New Stone',
            backgroundColor : 'white'
        });

        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : '',
            top : '5%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'Stone Name'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'create',
        }));

        button.addEventListener('click', function() {
            if (text.value == '') {
                alert('Please input name of new stone');
                return;
            }
            onErrorFunction = function(e) {
                activityIndicator.hide();
                alert('error : ' + e.error);
            };
            var now = new Date();
            var global_id = String.format('%04d%02d%02d%02d%02d%02d-%03d-%03.0f',
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDay(),
                        now.getHours(),
                        now.getMinutes(),
                        now.getSeconds(),
                        now.getMilliseconds(),
                        Math.random() * 1000);
            var params = {};
            params['stone[name]'] = text.value;
            params['stone[record_property_attributes][global_id]'] = global_id;
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');
            activityIndicator.show();
            si.model.medusa.postWithAuth({
                args : params,
                path : '/stones.json',
                username : username,
                password : password,
                onsuccess : function(stone) {
                    if (stone) {
                        si.model.medusa.getWithAuth({
                            path : '/stones/' + stone.id + '/record_property.json',
                            username : username,
                            password : password,
                            onsuccess : function(recordProperty) {
                                if (recordProperty) {
                                    activityIndicator.hide();
                                    si.ui.android.printLabel(recordProperty.global_id, stone.name);
                                    win.close();
                                } else {
                                    var e = {};
                                    e.error = "recored property not found";
                                    onErrorFunction(e);
                                }
                            },
                            onerror : onErrorFunction,
                        });
                    } else {
                        var e = {};
                        e.error = "stone not found";
                        onErrorFunction(e);
                    }
                },
                onerror : onErrorFunction,
            });
        });

        win.add(text);
        win.add(button);
        win.add(activityIndicator);

        return win;
    };
})();
