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
            activityIndicator.show();
            si.model.medusa.createNewStone({
                name : text.value,
                username : Ti.App.Properties.getString('username'),
                password : Ti.App.Properties.getString('password'),
                onsuccess : function(_record) {
                    activityIndicator.hide();
                    si.ui.android.printLabel(_record.global_id, _record.name);
                    win.close();
                },
                onerror : function(e) {
                    activityIndicator.hide();
                    alert('error : ' + e.error);
               },
            });
        });

        win.add(text);
        win.add(button);
        win.add(activityIndicator);

        return win;
    };
})();
