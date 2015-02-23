(function() {

    si.ui.createLoginWindow = function(_args) {
        var isDone = null;
        var win = Ti.UI.createWindow({
            title : 'Account setting',
//            backgroundColor : '#ffffff'
        });

       var viewBase = Ti.UI.createView({
//            backgroundColor : 'white',
            top : 0,
            width : '100%',
            height : '100%',
            layout : 'vertical'
        });

        var viewHeader = Ti.UI.createView({
//            backgroundColor : 'white',
            width : '100%',
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });

        var viewBody = Ti.UI.createView({
//            backgroundColor : 'white',
            top : 0,
            top : 0,
            //height : '70%',
        });


        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        // var textUsername = Ti.UI.createTextField(si.combine($$.TextField, {
        //     value : Ti.App.Properties.getString('username'),
        //     //top : '5%',
        //     hintText : 'user name'
        // }));

        var server = si.ui.createScanInput(si.combine($$.TextField, {
            value: Ti.App.Properties.getString('server'),
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'URI',            
        }));


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
            if (server.input.value == '' || username.input.value == '' || password.input.value == '') {
                si.ui.myAlert({message: 'Input URL, Username, and Password'});
                return;
            }

            Ti.App.Properties.setString('server',server.input.value);

            activityIndicator.show();
            si.model.medusa.getAccountInfo({
                username : username.input.value,
                password : password.input.value,
                onsuccess : function(response) {
                    Ti.App.Properties.setString('username', username.input.value);
                    Ti.App.Properties.setString('password', password.input.value);
                    activityIndicator.hide();
                    //si.ui.alert_simple('Login successful.');
                    win.close();
                    isDone = true;
                    _args.onsuccess();
                },
                onerror : function(e) {
                    activityIndicator.hide();
                    isDone = true;
                    si.ui.myAlert({message:'Login failed'});
                }
            });
        });

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            title : 'Cancel',
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
        viewHeader.add(Ti.UI.createLabel({left: 5, text : 'URL'}));
        viewHeader.add(server);        
        viewHeader.add(Ti.UI.createLabel({left: 5, text : 'Username'}));
        viewHeader.add(username);
        viewHeader.add(Ti.UI.createLabel({left: 5, text : 'Password'}));        
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