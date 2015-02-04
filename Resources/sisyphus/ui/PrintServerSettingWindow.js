(function() {
    si.ui.createPrintServerSetttingWindow = function(_args) {
        return si.ui.createInputOrScanWindow({
            title: 'print server',
            value: Ti.App.Properties.getString('printServer'),
            save : function(w) {
                Ti.App.Properties.setString('printServer',w.text_field.value);
                w.close();
            }
        });

        var win = Ti.UI.createWindow({
            title : 'print server',
            backgroundColor : 'white'
        });

        var viewHeader = Ti.UI.createView({
            backgroundColor : 'red',
            top : 0,
            height : '15%'
        });

        var viewHeaderLeft = Ti.UI.createView({
            height : '100%',
            width : '80%',
            top : 0,
            left : 0,
            backgroundColor : 'white',
        });

        var viewHeaderRight = Ti.UI.createView({
            height : '100%',
            width : '20%',
            top : 0,
            right : 0,
            backgroundColor : 'red',
            layout : 'horizontal'
        });



        var imageButtonScan = si.ui.createImageButtonView('/images/barcode.png', {
//            top : '5%',
//            right : 0,
//            width : '95%',
//            height : '95%'
        });

        imageButtonScan.button.addEventListener('click', function(e) {
            if (!si.config.Medusa.debug) {
                si.TiBar.scan({
                    configure : si.config.TiBar,
                    success : function(_data) {
                        if (_data && _data.barcode) {
                            text.value = _data.barcode;
                        }
                    },
                    cancel : function() {
                    },
                    error : function() {
                    }
                });
            }
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : Ti.App.Properties.getString('printServer'),
            width : '95%',
            top : '50%',
            //left : 0,
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

        win.add(viewHeader);
        viewHeader.add(viewHeaderLeft);
        viewHeader.add(viewHeaderRight);
        viewHeaderLeft.add(text);        
        viewHeaderRight.add(imageButtonScan);

//        win.add(text);
//        win.add(imageButtonScan);
//        win.add(rightbutton);
        win.add(button);
        return win;
    };
})(); 