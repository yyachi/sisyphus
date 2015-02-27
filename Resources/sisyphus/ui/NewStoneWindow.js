(function() {
    si.ui.createNewStoneWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'New stone',
//            backgroundColor : 'black'
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

        var viewHeaderRight = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            right : 0,
            //backgroundColor : 'yellow',
            layout : 'horizontal'
        });

        var viewButton = Ti.UI.createView({
//            backgroundColor : 'black',
            height : Ti.UI.SIZE,
            width : '100%',
        });

        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : '',
            width : '100%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input name'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'OK',
            top : 0
        }));

        button.addEventListener('click', function() {
            win.save();
        });

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            top : 0,
            title : 'Cancel',
        }));

        cancel_button.addEventListener('click', function() {
            win.close();
        });

        var scan_input = si.ui.createScanInput(si.combine($$.TextField, {
            value : '',
            width : '100%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input ID'
        }));

        var myImageView = si.ui.createMyImageView({
            width : Ti.UI.SIZE
        });
        viewBase.add(viewBody);
        viewBody.add(viewHeader);
        viewHeader.add(viewHeaderRight);
        viewHeaderRight.add(myImageView);
        viewBody.add(Ti.UI.createLabel({left: 5, text : 'Name'}));
        viewBody.add(text);
        if (!Ti.App.Properties.getBool('printLabel')){
            viewBody.add(Ti.UI.createLabel({left: 5, text : 'ID'}));
            viewBody.add(scan_input);
        }
        viewBody.add(viewButton);
        viewButton.add(button);
        viewButton.add(cancel_button);
        //viewBody.add(Ti.UI.createLabel({left: 5, text : 'Attachment file'}));        
        //viewBody.add(myImageView);

        win.add(viewBase);
        win.add(activityIndicator);
        win.name_field = text;
        win.save_button = button;
        win.global_id = scan_input.input;

        win.set_image = function(_image) {
            myImageView.set_image(_image);
        };
        win.set_global_id = function(gid) {
            scan_input.set_value(gid);
        }

        win.save = function(){
            if (text.value == '') {
                si.ui.alert_simple('Input name of new stone');
                return;
            }
            var params = {};
            params['name'] = text.value;
            if (win.global_id.value){
                Ti.API.info("global_id:" + win.global_id.value);
                params['global_id'] = win.global_id.value;
            } else {
                Ti.API.info("no global_id");
            }
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
