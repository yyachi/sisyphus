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

        var textUsername = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('username'),
            //top : '5%',
            hintText : 'user name'
        }));
        
        var textPassword = Ti.UI.createTextField(si.combine($$.TextField, {
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

        viewHeader.add(textUsername);
        viewHeader.add(textPassword);        
        viewBody.add(button);
        viewBody.add(cancel_button);


        // win.add(textUsername);
        // win.add(textPassword);
        // win.add(button);
        win.add(activityIndicator);
        win.isDone = isDone; 

        win.textUsername = textUsername;
        win.textPassword = textPassword;
        win.save_button = button;
        win.activityIndicator = activityIndicator;

        return win;
    };
})(); 