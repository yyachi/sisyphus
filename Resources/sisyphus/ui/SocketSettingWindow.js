(function() {

    si.ui.createSocketSettingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'socket server',
            backgroundColor : '#ffffff'
        });

        var textServer = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('socket_server'),
            top : '5%',
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'host name'
        }));

        var textListenTo = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('socket_listen_to'),
            top : '30%',
            keyboardType : Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
            hintText : 'port listen to'
        }));

        var textWriteTo = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('socket_write_to'),
            top : '55%',
            keyboardType : Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
            hintText : 'port write to'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
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

            Ti.App.Properties.setString('socket_server', textServer.value);
            Ti.App.Properties.setString('socket_listen_to', textListenTo.value);
            Ti.App.Properties.setString('socket_write_to', textWriteTo.value);
            win.close();
        });

        win.add(textServer);
        win.add(textListenTo);
        win.add(textWriteTo);
        win.add(button);
        return win;
    };
})(); 