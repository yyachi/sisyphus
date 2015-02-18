(function() {
    si.ui.createLabelPrintSettingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'Label setting',
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
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });

        var viewBody = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0
        });

        var viewStatus = Ti.UI.createView({
            height : Ti.UI.SIZE,
            layout : 'horizontal'
        });
        var viewTestPrint = Ti.UI.createView({
            width : Ti.UI.FILL,
            //backgroundColor : 'yellow',
            //right : 0,
            height : Ti.UI.SIZE
        });
        var statusSwitch = Ti.UI.createSwitch({
            left: 10,
            value: Ti.App.Properties.getBool('printLabel')
        });

        statusSwitch.addEventListener('change', function(e){
            Ti.App.Properties.setBool('printLabel', statusSwitch.value);
        })

        var server = si.ui.createScanInput(si.combine($$.TextField, {
            value: Ti.App.Properties.getString('printServer'),
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'print server url',            
        }));

        var template = si.ui.createScanInput(si.combine($$.TextField, {
            value: Ti.App.Properties.getString('printFormatUrl'),
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'template file url',            
        }));


        // var template = Ti.UI.createTextField(si.combine($$.TextField, {
        //     value : Ti.App.Properties.getString('printFormatUrl'),
        //     //top : '5%',
        //     keyboardType :  Ti.UI.KEYBOARD_URL,
        //     hintText : 'Print format url'
        // }));

        var printtext = si.ui.createInputPrint(si.combine($$.TextField, {
            //width: '50%',
            top : 0,
            value: 'hello world',
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'text for print',            
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'OK',
            top : 0
        }));

        button.addEventListener('click', function() {
            // if (text.value == '') {
            //     alert('Please input url of print format');
            //     return;
            // }
            Ti.App.Properties.setString('printServer',server.input.value);
            Ti.App.Properties.setString('printFormatUrl',template.input.value);
            win.close();
        });

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            top : 0,
            title : 'Cancel',
        }));

        cancel_button.addEventListener('click', function() {
            win.close();
        });

        win.add(viewBase);
        viewBase.add(viewHeader);
        viewBase.add(viewBody);
        viewHeader.add(Ti.UI.createLabel({left: 5, text: 'ON/OFF'}));
        viewStatus.add(statusSwitch);
        viewHeader.add(viewStatus);        
        viewHeader.add(Ti.UI.createLabel({left: 5, text: 'URL'}));
        viewHeader.add(server);
        viewHeader.add(Ti.UI.createLabel({left: 5, text: 'Template'}));
        viewHeader.add(template);
        //viewStatus.add(viewTestPrint);
        //viewTestPrint.add(printtext);
        viewBody.add(button);
        viewBody.add(cancel_button);

        win.server = server;
        win.template = template;
        win.save_button = button;
        return win;
    };
})(); 