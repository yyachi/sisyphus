(function() {

    si.ui.createSocketSettingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'socket server',
            backgroundColor : '#ffffff'
        });

        var textServer = Titanium.UI.createTextField(si.combine($$.TextField, {
            value : Titanium.App.Properties.getString('socket_server'),
            top : '5%',
            keyboardType : Titanium.UI.KEYBOARD_URL,
            hintText : 'host name'
        }));

        var textListenTo = Titanium.UI.createTextField(si.combine($$.TextField, {
            value : Titanium.App.Properties.getString('socket_listen_to'),
            top : '30%',
            keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
            hintText : 'port listen to'
        }));

        var textWriteTo = Titanium.UI.createTextField(si.combine($$.TextField, {
            value : Titanium.App.Properties.getString('socket_write_to'),
            top : '55%',
            keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
            hintText : 'port write to'
        }));

        var button = Titanium.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save'
        }));

        button.addEventListener('click', function() {
            if (textServer.value == '') {
                alert('Please input host name.');
                return;
            }

            if (textListenTo.value == '') {
                alert('Please input port listen to.');
                return;
            }

            if (textWriteTo.value == '') {
                alert('Please input port write to.');
                return;
            }

            Titanium.App.Properties.setString('socket_server', textServer.value);
            Titanium.App.Properties.setString('socket_listen_to', textListenTo.value);
            Titanium.App.Properties.setString('socket_write_to', textWriteTo.value);
            win.close();
        });

        win.add(textServer);
        win.add(textListenTo);
        win.add(textWriteTo);
        win.add(button);
        return win;
    };
})(); 