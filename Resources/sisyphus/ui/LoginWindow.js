(function() {

    si.ui.createLoginWindow = function(_args) {
        var isDone = null;
        var win = Ti.UI.createWindow({
            title : 'account',
            backgroundColor : '#ffffff'
        });

       var viewBase = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0,
            width : '100%',
            height : '100%',
            layout : 'vertical'
        });

        var viewHeader = Ti.UI.createView({
            backgroundColor : 'white',
            width : '100%',
            height : '25%',
            layout : 'vertical'
        });

        var viewBody = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0,
            top : 0,
            height : '85%',
        });


        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        // var textUsername = Ti.UI.createTextField(si.combine($$.TextField, {
        //     value : Ti.App.Properties.getString('username'),
        //     //top : '5%',
        //     hintText : 'user name'
        // }));

        var username = si.ui.createScanInput(si.combine($$.TextField, {
//            width : '100%',
            value : Ti.App.Properties.getString('username'),
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'user name'
        }));

        
        var textPassword = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('password'),
            passwordMask : true,
            //top : '30%',
            hintText : 'password'
        }));

        var password = si.ui.createScanInput(si.combine($$.TextField, {
//            width : '100%',
            value : Ti.App.Properties.getString('password'),
            passwordMask : true,
            //top : '30%',
            hintText : 'password'
        }));

        
        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'OK',
            //width : '90%',
            top : 0
        }));
        button.addEventListener('click', function() {
            isDone = false;
            Ti.API.info('click');
            textPassword.blur();
            if (username.input.value == '' || password.input.value == '') {
                alert('Please input username and password.');
                return;
            }

            activityIndicator.show();
            si.model.medusa.getAccountInfo({
                username : username.input.value,
                password : password.input.value,
                onsuccess : function(response) {
                    Ti.App.Properties.setString('username', username.input.value);
                    Ti.App.Properties.setString('password', password.input.value);
                    activityIndicator.hide();
                    win.close();
                    isDone = true;
                },
                onerror : function(e) {
                    activityIndicator.hide();
                    isDone = true;
                    alert('Login failed!');
                }
            });
        });

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            title : 'cancel',
            top : 0
        }));

        cancel_button.addEventListener('click', function() {
            win.close();
        });

        win.add(viewBase);
        viewBase.add(viewHeader);
        viewBase.add(viewBody);

        //viewHeader.add(textUsername);
        //viewHeader.add(textPassword);        
        viewHeader.add(username);
        viewHeader.add(password);        
        viewBody.add(button);
        viewBody.add(cancel_button);


        // win.add(textUsername);
        // win.add(textPassword);
        // win.add(button);
        win.add(activityIndicator);
        win.isDone = isDone; 

        win.username = username;
        win.password = password;
        win.save_button = button;
        win.activityIndicator = activityIndicator;

        return win;
    };
})(); 