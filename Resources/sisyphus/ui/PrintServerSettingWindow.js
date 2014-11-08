(function() {
    si.ui.createPrintServerSetttingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'print server',
            backgroundColor : 'white'
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('printServer'),
            top : '5%',
            keyboardType :  Ti.UI.KEYBOARD_URL,
            hintText : 'URI (http://localhost:8080/)'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save',
        }));

        button.addEventListener('click', function() {
            if (text.value == '') {
                alert('Please input uri of print server');
                return;
            }
            Ti.App.Properties.setString('printServer',text.value);
            win.close();
        });

        win.add(text);
        win.add(button);
        return win;
    };
})(); 