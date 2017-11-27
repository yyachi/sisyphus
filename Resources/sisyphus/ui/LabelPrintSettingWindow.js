(function() {
    si.ui.createLabelPrintSettingWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'Label setting',
//            backgroundColor : 'white'
        });

        win.buttons = {};
        win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.close() }
        });
        win.buttons.Close.left = 0;

        win.buttons.Print = si.ui.createImageButtonView('/images/glyphicons-16-print.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.print() }
        });

        win.buttons.Save = si.ui.createImageButtonView('/images/glyphicons-415-disk-save.png', {
            right : 0,
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.save() }
        });
        win.buttons.Save.right = 0;

       var viewBase = Ti.UI.createView({
//            backgroundColor : 'white',
            top : 0,
            width : '100%',
            height : '100%',
            layout : 'vertical'
        });

        var viewHeader = Ti.UI.createView({
//            backgroundColor : 'white',
            height : Ti.UI.SIZE,
            width : Ti.UI.FILL,
            //layout : 'vertical'
        });

        var viewHeaderLeft = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            left : 0,
            top : 0,
            //backgroundColor : 'yellow',
            layout : 'horizontal'
        });

        var viewHeaderRight = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            right : 0,
            top : 0,
            //backgroundColor : 'yellow',
            layout : 'horizontal'
        });

        var viewBody = Ti.UI.createView({
            height : '100%',
            layout : 'vertical'
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
            width: '100%',
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'input print server URL',            
        }));

        var template = si.ui.createScanInput(si.combine($$.TextField, {
            value: Ti.App.Properties.getString('printFormatUrl'),
            width: '100%',
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'input template file URL',            
        }));

        var printer_name = si.ui.createPickerInput(si.app.printer_names(), Ti.App.Properties.getString('printerNameID'));
        var template_name = si.ui.createPickerInput(si.app.template_names(), Ti.App.Properties.getString('templateNameID'));

        var printtext = si.ui.createInputPrint(si.combine($$.TextField, {
            //width: '50%',
            top : 0,
            value: 'hello world',
            keyboardType : Ti.UI.KEYBOARD_URL,
            hintText : 'text for print',            
        }));

        win.save = function(){
            var print_server_bak = Ti.App.Properties.getString('printServer');

            Ti.App.Properties.setString('printServer',server.input.value);
            Ti.App.Properties.setString('printFormatUrl',template.input.value);

            var _printer_name, _printer_id;
            if (printer_name.getSelectedRow(0) == null) {
                _printer_name = null;
                _printer_id = null;
            } else {
                _printer_name = printer_name.getSelectedRow(0).title;
                _printer_id = printer_name.getSelectedRow(0).id;
            }
            Ti.App.Properties.setString('printerName',_printer_name);
            Ti.App.Properties.setString('printerNameID',_printer_id);

            var _template_name, _template_id;
            if (template_name.getSelectedRow(0) == null) {
                _template_name = null;
                _template_id = null;
            } else {
                _template_name = template_name.getSelectedRow(0).title;
                _template_id = template_name.getSelectedRow(0).id;
            }
            Ti.App.Properties.setString('templateName',_template_name);
            Ti.App.Properties.setString('templateNameID',_template_id);

            win.close();
 
            if (print_server_bak != Ti.App.Properties.getString('printServer')) {
               Ti.App.Properties.setList("printer_names", null);
               si.app.getPrinterNames();
               Ti.App.Properties.setList("template_names", null);
               si.app.getTemplateNames();
            }
        };

        win.print = function(){
            var _message = 'test print...test print...label...';
            si.app.log.info(_message + 'sending...ok');
            _message += 'creating...';
            var _printer_name;
            if (printer_name.getSelectedRow(0) == null) {
                _printer_name = null;
            } else {
                _printer_name = printer_name.getSelectedRow(0).title;
            }
            var _template_name;
            if (template_name.getSelectedRow(0) == null) {
                _template_name = null;
            } else {
                _template_name = template_name.getSelectedRow(0).title;
            }
            si.ui.android.testPrintLabel('test print', 'test print', server.input.value, template.input.value, _printer_name, _template_name, {
                onsuccess: function(e){
                    si.sound_label.play();
                    si.app.log.info(_message + 'ok');
                },
                onerror: function(e){
                    changeMode('error',_message);
                }
            });
        };


        win.add(viewBase);
        viewBase.add(viewHeader);
        viewBase.add(viewBody);
        viewHeader.add(viewHeaderLeft);
        viewHeaderLeft.add(win.buttons.Close);        
        viewHeader.add(viewHeaderRight);
        viewHeaderRight.add(win.buttons.Print);
        viewHeaderRight.add(win.buttons.Save);

        // win.add(viewBase);
        // viewBase.add(viewHeader);
        // viewBase.add(viewBody);

        var table = Ti.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            showVerticalScrollIndicator: true,
            height : Ti.UI.SIZE,
            width : Ti.UI.FILL,
            layout : 'vertical'
        });
        table.add(si.ui.createInputRow("ON/OFF", statusSwitch, {}));
        table.add(si.ui.createInputRow("URL", server, {}));
        table.add(si.ui.createInputRow("Template", template, {}));
        table.add(si.ui.createInputRow("PrinterName", printer_name, {}));
        table.add(si.ui.createInputRow("TemplateName", template_name, {}));
        viewBody.add(table);
        // viewBody.add(Ti.UI.createLabel({left: 5, text: 'ON/OFF'}));
        // viewStatus.add(statusSwitch);
        // viewBody.add(viewStatus);        
        // viewBody.add(Ti.UI.createLabel({left: 5, text: 'URL'}));
        // viewBody.add(server);
        // viewBody.add(Ti.UI.createLabel({left: 5, text: 'Template'}));
        // viewBody.add(template);
        //viewStatus.add(viewTestPrint);
        //viewTestPrint.add(printtext);
        //viewBody.add(button);
        //viewBody.add(cancel_button);

        win.server = server;
        win.template = template;
        win.printer_name = printer_name;
        win.template_name = template_name;
        win.print_button = win.buttons.Print;
        win.save_button = win.buttons.Save;
        return win;
    };
})(); 
