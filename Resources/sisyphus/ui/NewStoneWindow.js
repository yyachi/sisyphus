(function() {
    si.ui.createNewStoneWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'New stone',
//            backgroundColor : 'black'
        });

        win.buttons = {};
        win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.close() }
        });
        win.buttons.Close.left = 0;

        win.buttons.Save = si.ui.createImageButtonView('/images/glyphicons-415-disk-save.png', {
            right : 0,
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.save() }
        });
        win.buttons.Save.right = 0;

        win.fields = {};
        win.fields.name = Ti.UI.createTextField(si.combine($$.TextField, {
            value : '',
            width : '100%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input name'
        }));
        win.fields.ID = si.ui.createScanInput(si.combine($$.TextField, {
            value : '',
            width : '100%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input ID'
        }));
        win.fields.classification = si.ui.createPickerInput(si.app.classifications(), {hintText:''});
        win.fields.physical_form = si.ui.createPickerInput(si.app.physical_forms(), {hintText:''});
        win.fields.quantity = Ti.UI.createTextField({
            value : '',
            width : Ti.UI.FILL,
            keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
            hintText : 'input quantity'            
        });

        win.fields.quantity_unit = Ti.UI.createTextField({
            value : '',
            width : Ti.UI.FILL,
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input quantity unit'            
        });

        win.fields.description = Ti.UI.createTextArea({
            width : Ti.UI.FILL,
            hintText : 'input description'
        });


        var viewBase = Ti.UI.createView({
            width : '100%',
            height : '100%',
            layout : 'vertical'
        });

        var viewBody = Ti.UI.createView({
            height : '100%',
            layout : 'vertical'
        });

        var viewHeader = Ti.UI.createView({
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

        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });


        var myImageView = si.ui.createMyImageView({
            width : Ti.UI.SIZE
        });

        var table = Ti.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            showVerticalScrollIndicator: true,
            height : Ti.UI.SIZE,
            width : Ti.UI.FILL,
            layout : 'vertical'
        });
        table.add(si.ui.createInputRow("Name", win.fields.name, {}));
        if (!Ti.App.Properties.getBool('printLabel')){
            table.add(si.ui.createInputRow("ID", win.fields.ID, {}));
        }
        table.add(si.ui.createInputRow("Classification", win.fields.classification, {}));
        table.add(si.ui.createInputRow("Physical form", win.fields.physical_form, {}));
        table.add(si.ui.createInputRow("Quantity", win.fields.quantity, {}));
        table.add(si.ui.createInputRow("Quantity unit", win.fields.quantity_unit, {}));
        table.add(si.ui.createInputRow("Description", win.fields.description, {}));

        viewBase.add(viewBody);
        viewBody.add(viewHeader);
        viewHeader.add(viewHeaderLeft);
        viewHeaderLeft.add(win.buttons.Close);
        viewHeader.add(viewHeaderRight);
        viewHeaderRight.add(myImageView);
        viewHeaderRight.add(win.buttons.Save);

        viewBody.add(table);
        win.add(viewBase);
        win.add(activityIndicator);
        win.name_field = win.fields.name;
        win.save_button = win.buttons.Save;
        win.global_id = win.fields.ID.input;

        win.set_image = function(_image) {
            myImageView.set_image(_image);
        };
        win.set_global_id = function(gid) {
            win.fields.ID.set_value(gid);
        }

        win.save = function(){
            if (win.fields.name.value == '') {
                si.ui.alert_simple('Input name of new stone');
                return;
            }
            var params = {};
            params['name'] = win.fields.name.value;
            if (win.global_id.value){
                Ti.API.info("global_id:" + win.global_id.value);
                params['global_id'] = win.global_id.value;
            } else {
                Ti.API.info("no global_id");
            }
            if (win.fields.classification.value){
                params['classification_id'] = win.fields.classification.value;
            }
            if (win.fields.physical_form.value){
                params['physical_form_id'] = win.fields.physical_form.value;
            }
            if (win.fields.quantity.value){
                params['quantity'] = win.fields.quantity.value;
            }

            if (win.fields.quantity_unit.value){
                params['quantity_unit'] = win.fields.quantity_unit.value;
            }
            if (win.fields.description.value){
                params['description'] = win.fields.description.value;
            }

            Ti.API.info(params);
            activityIndicator.show();
            si.model.medusa.createNewStone({
                args : params,
                username : Ti.App.Properties.getString('username'),
                password : Ti.App.Properties.getString('password'),
                onsuccess : function(_record) {
                    activityIndicator.hide();
                    //si.ui.android.printLabel(_record.global_id, _record.name);
                    if (myImageView.image){
                        si.model.medusa.uploadImage({
                            record : _record,
                            data : myImageView.image,
                            username : Ti.App.Properties.getString('username'),
                            password : Ti.App.Properties.getString('password'),
                            onsuccess : (function(_image) {
                                activityIndicator.hide();
                                _record.image = _image
                                _args.onsuccess(_record);
                            }),
                            onerror : (function(e) {
                                activityIndicator.hide();
                                si.ui.alert_simple('Upload image failed');
                            }),
                        });            
                    } else {
                        activityIndicator.hide();
                        _args.onsuccess(_record);
                    }
                    win.close();
                },
                onerror : function(e) {
                    activityIndicator.hide();
                    var _message = 'No stone created'
                    si.ui.showErrorDialog(_message);
                    //si.ui.alert_simple('error : ' + e.error);
               },
            });
        };

        return win;
    };
})();
