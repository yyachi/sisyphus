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
        var timeout = Ti.UI.createTextField({
            value : Ti.App.Properties.getString('printTimeout'),
            width : '100%',
            keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
            hintText : 'input seconds for timeout'
        });


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

            var _printer_name, _printer_id, _printer_title;
            if (printer_name.getSelectedRow(0) == null) {
                _printer_name = null;
                _printer_id = null;
                _printer_title = null;
            } else if (printer_name.getSelectedRow(0).id == null) {
                _printer_name = printer_name.getSelectedRow(0).title;
                _printer_id = printer_name.getSelectedRow(0).id;
                _printer_title = printer_name.getSelectedRow(0).title;
            } else {
                _printer_name = printer_name.getSelectedRow(0).name;
                _printer_id = printer_name.getSelectedRow(0).id;
                _printer_title = printer_name.getSelectedRow(0).title;
            }
            Ti.App.Properties.setString('printerName',_printer_name);
            Ti.App.Properties.setString('printerNameID',_printer_id);
            Ti.App.Properties.setString('printerNameTitle',_printer_title);

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

            Ti.App.Properties.setString('printTimeout',timeout.value);
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
            } else if (printer_name.getSelectedRow(0).id == null) {
                _printer_name = printer_name.getSelectedRow(0).title;
            } else {
                _printer_name = printer_name.getSelectedRow(0).name;
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
        var printer_name_row = si.ui.createInputRow("PrinterName", printer_name, {});
        table.add(printer_name_row);
        var template_name_row = si.ui.createInputRow("TemplateName", template_name, {});
        table.add(template_name_row);
        table.add(si.ui.createInputRow("Timeout", timeout, {}));
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

        var input_server_bak = Ti.App.Properties.getString('printServer');
        var reflectPrintServer = function() {
            if (server.input.value != input_server_bak) {
                var client_p = Ti.Network.createHTTPClient();
                client_p.onload = function(){
                    var data_p = [];
                    var printers = JSON.parse(this.responseText);
                    for(var i=0; i<printers.length; i++){
                        var title = printers[i].nickname;
                        if (title == null || title == '') {
                            title = printers[i].name;
                        }
                        data_p.push({"title":title,"id":i,"name":printers[i].name,"nickname":printers[i].nickname});
                    }
                    printer_name_row.remove(printer_name);
                    printer_name = si.ui.createPickerInput(data_p, null);
                    printer_name_row.add(printer_name);
                    win.printer_name = printer_name;
                }
                client_p.onerror = function(){
                    printer_name_row.remove(printer_name);
                    printer_name = si.ui.createPickerInput(null, null);
                    printer_name_row.add(printer_name);
                    win.printer_name = printer_name;
                }
                var url_p = server.input.value;
                if (server.input.value.match(/^\w+:\/\//) == null) {
                    url_p = 'http://' + url_p;
                }
                if (server.input.value.match(/\/$/) == null) {
                    url_p = url_p + '/';
                }
                url_p += 'printers.json';
                Ti.API.info('url:' + url_p);
                client_p.open('GET', url_p);
                client_p.timeout = 3000;
                client_p.send();

                var client_t = Ti.Network.createHTTPClient();
                client_t.onload = function(){
                    var data_t = [];
                    var templates = JSON.parse(this.responseText);
                    for(var i=0; i<templates.length; i++){
                       data_t.push({"title":templates[i].name,"id":i});
                    }
                    template_name_row.remove(template_name);
                    template_name = si.ui.createPickerInput(data_t, null);
                    template_name_row.add(template_name);
                    win.template_name = template_name;
                }
                client_t.onerror = function(){
                    template_name_row.remove(template_name);
                    template_name = si.ui.createPickerInput(null, null);
                    template_name_row.add(template_name);
                    win.template_name = template_name;
                }
                var url_t = server.input.value;
                if (server.input.value.match(/^\w+:\/\//) == null) {
                    url_t = 'http://' + url_t;
                }
                if (server.input.value.match(/\/$/) == null) {
                    url_t = url_t + '/';
                }
                url_t += 'templates.json';
                Ti.API.info('url:' + url_t);
                client_t.open('GET', url_t);
                client_t.timeout = 3000;
                client_t.send();

                input_server_bak = server.input.value;
            }
        }

        win.server.input.addEventListener('blur', function(e){
            reflectPrintServer();
        });
        printer_name_row.addEventListener('click', function(e){
            reflectPrintServer();
        });
        template_name_row.addEventListener('click', function(e){
            reflectPrintServer();
        });

        return win;
    };
})(); 
