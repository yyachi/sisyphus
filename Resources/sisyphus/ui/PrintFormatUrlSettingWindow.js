(function() {
    si.ui.createPrintFormatUrlSetttingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'Print format url',
            backgroundColor : 'white'
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('printFormatUrl'),
            top : '5%',
            keyboardType :  Ti.UI.KEYBOARD_URL,
            hintText : 'Print format url'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save',
        }));

        button.addEventListener('click', function() {
            if (text.value == '') {
                alert('Please input url of print format');
                return;
            }
            Ti.App.Properties.setString('printFormatUrl',text.value);
            win.close();
        });

        win.add(text);
        win.add(button);
        return win;
    };
})(); 