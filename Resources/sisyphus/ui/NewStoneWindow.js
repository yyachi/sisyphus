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
            var stone;
            var recordProperty;
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');
            activityIndicator.show();
            si.model.medusa.postWithAuth({
                args : {
                    name : text.value
                },
                path : '/stones.json',
                username : username,
                password : password,
                onsuccess : function(_response) {
                    stone = eval('(' + _response + ')');
                    if (stone) {
                        si.model.medusa.getWithAuth({
                            path : '/stones/' + stone.id + '/record_property.json',
                            username : username,
                            password : password,
                            onsuccess : function(_recordProperty) {
                                recordProperty = eval('(' + _recordProperty + ')');
                                if (recordProperty) {
                                    activityIndicator.hide();
                                    si.ui.android.printLabel(recordProperty.global_id, stone.name);
                                    win.close();
                                } else {
                                    onErrorFunction(e);
                                    }
                                },
                            onerror : onErrorFunction,
                            });
                    } else {
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
