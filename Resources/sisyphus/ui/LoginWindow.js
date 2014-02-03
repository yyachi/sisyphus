(function() {

    si.ui.createLoginWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'account',
            backgroundColor : '#ffffff'
        });

        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        var textUsername = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('username'),
            top : '5%',
            hintText : 'user name'
        }));
        
        var textPassword = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('password'),
            passwordMask : true,
            top : '30%',
            hintText : 'password'
        }));
        
        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save',
        }));
        button.addEventListener('click', function() {
            Ti.API.info('click');
            textPassword.blur();
            if (textUsername.value == '' || textPassword.value == '') {
                alert('Please input username and password.');
                return;
            }

            activityIndicator.show();
            si.model.medusa.getAccountInfo({
                username : textUsername.value,
                password : textPassword.value,
                onsuccess : function(response) {
                    Ti.App.Properties.setString('username', textUsername.value);
                    Ti.App.Properties.setString('password', textPassword.value);
                    activityIndicator.hide();
                    win.close();
                },
                onerror : function(e) {
                    activityIndicator.hide();
                    alert('Login failed!');
                }
            });
        });

        win.add(textUsername);
        win.add(textPassword);
        win.add(button);
        win.add(activityIndicator);

        return win;
    };
})(); 