(function() {

    si.ui.createLoginWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'account',
            backgroundColor : '#ffffff'
        });
        var navActInd = Titanium.UI.createActivityIndicator();
        if (Titanium.Platform.name == 'iPhone OS') {
            win.setRightNavButton(navActInd);
        }

        var textUsername = Titanium.UI.createTextField(si.combine($$.TextField, {
            value : Titanium.App.Properties.getString('username'),
            top : '5%',
            hintText : 'user name'
        }));
        
        var textPassword = Titanium.UI.createTextField(si.combine($$.TextField, {
            value : Titanium.App.Properties.getString('password'),
            passwordMask : true,
            top : '30%',
            hintText : 'password'
        }));
        
        var button = Titanium.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save',
        }));
        button.addEventListener('click', function() {
            textPassword.blur();
            if (textUsername.value == '' || textPassword.value == '') {
                alert('Please input username and password.');
                return;
            }

            navActInd.show();
            // （プロビズモ渡部)getAccountInfoはリソースにアクセスできるかの判定にしか使ってないので、他の何かで代用できないか検討する
            si.model.medusa.getAccountInfo({
                username : textUsername.value,
                password : textPassword.value,
                onsuccess : function(info) {
                    Titanium.App.Properties.setString('username', textUsername.value);
                    Titanium.App.Properties.setString('password', textPassword.value);
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