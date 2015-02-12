(function() {
    si.ui.createPrintFormatUrlSettingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'Print format url',
            backgroundColor : 'white'
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
            height : '25%'
        });

        var viewBody = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0,
            top : 0,
            height : '85%'
        });


        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('printFormatUrl'),
            //top : '5%',
            keyboardType :  Ti.UI.KEYBOARD_URL,
            hintText : 'Print format url'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'OK',
            top : 0
        }));

        button.addEventListener('click', function() {
            if (text.value == '') {
                alert('Please input url of print format');
                return;
            }
            Ti.App.Properties.setString('printFormatUrl',text.value);
            win.close();
        });

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            top : 0,
            title : 'cancel',
        }));

        cancel_button.addEventListener('click', function() {
            win.close();
        });

        win.add(viewBase);
        viewBase.add(viewHeader);
        viewBase.add(viewBody);

        viewHeader.add(text);
        viewBody.add(button);
        viewBody.add(cancel_button);

        win.textPrintFormUrl = text;
        win.save_button = button;
        return win;
    };
})(); 