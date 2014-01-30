(function() {

    si.ui.createLoginWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'account',
            backgroundColor : '#ffffff'
        });
        var navActInd = Ti.UI.createActivityIndicator();
        if (Ti.Platform.name == 'iPhone OS') {
            win.setRightNavButton(navActInd);
        }

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
            textPassword.blur();
            if (textUsername.value == '' || textPassword.value == '') {
                alert('Please input username and password.');
                return;
            }

            navActInd.show();
            si.model.medusa.getAccountInfo({
                username : textUsername.value,
                password : textPassword.value,
                onsuccess : function(response) {
                    Ti.App.Properties.setString('username', textUsername.value);
                    Ti.App.Properties.setString('password', textPassword.value);
                    navActInd.hide();
                    win.close();
                },
                onerror : function(e) {
                    navActInd.hide();
                    alert('Login failed!');
                }
            });
        });

        win.add(textUsername);
        win.add(textPassword);
        win.add(button);

        return win;
    };
})(); 