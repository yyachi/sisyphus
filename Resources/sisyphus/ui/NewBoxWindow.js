(function() {
    si.ui.createNewBoxWindow = function(_args) {

        var win = Ti.UI.createWindow({
            title : 'New box',
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

        var viewButton = Ti.UI.createView({
            backgroundColor : 'black',
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

        var myImageView = si.ui.createMyImageView();
        viewBase.add(viewBody);
        viewBody.add(Ti.UI.createLabel({left: 5, text : 'Name'}));
        viewBody.add(text);
        if (!Ti.App.Properties.getBool('printLabel')){
            viewBody.add(Ti.UI.createLabel({left: 5, text : 'ID'}));
            viewBody.add(scan_input);
        }
        viewBody.add(viewButton);
        viewButton.add(button);
        viewButton.add(cancel_button);
        viewBody.add(Ti.UI.createLabel({left: 5, text : 'Attachment file'}));        
        viewBody.add(myImageView);

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
                alert('Please input name of new box');
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
            si.model.medusa.createNewBox({
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
                                alert('error : ' + e.error);
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
                    alert('error : ' + e.error);
               },
            });            
        };

        return win;



        // var win = Ti.UI.createWindow({
        //     title : 'NEW',
        //     backgroundColor : 'white'
        // });


        // var viewBase = Ti.UI.createView({
        //     backgroundColor : 'blue',
        //     top : 0,
        //     width : '100%',
        //     height : '100%',
        //     layout : 'vertical'
        // });

        // var viewHeader = Ti.UI.createView({
        //     backgroundColor : 'red',
        //     height : '25%'
        // });

        // var viewBody = Ti.UI.createView({
        //     backgroundColor : 'white',
        //     top : 0,
        //     top : 0,
        //     height : '85%'
        // });

        // var viewHeaderLeft = Ti.UI.createView({
        //     height : '100%',
        //     width : '20%',
        //     top : 0,
        //     left : 0,
        //     backgroundColor : 'white',
        // });

        // var viewHeaderRight = Ti.UI.createView({
        //     height : '100%',
        //     width : '80%',
        //     top : 0,
        //     right : 0,
        //     backgroundColor : 'white',
        //     //layout : 'horizontal'
        // });


        // var activityIndicator = Ti.UI.createActivityIndicator({
        //     style : Ti.UI.ActivityIndicatorStyle.BIG,
        // });

        // var text = Ti.UI.createTextField(si.combine($$.TextField, {
        //     value : '',
        //     top : '2%',
        //     keyboardType : Ti.UI.KEYBOARD_DEFAULT,
        //     hintText : 'my great box'
        // }));

        // var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
        //     title : 'create',
        // }));

        // button.addEventListener('click', function() {
        //     if (text.value == '') {
        //         alert('Please input name of new stone');
        //         return;
        //     }
        //     activityIndicator.show();
        //     si.model.medusa.createNewBox({
        //         name : text.value,
        //         username : Ti.App.Properties.getString('username'),
        //         password : Ti.App.Properties.getString('password'),
        //         onsuccess : function(_record) {
        //             activityIndicator.hide();
        //             //si.ui.android.printLabel(_record.global_id, _record.name);
        //             if (myImageView.image){
        //                 si.model.medusa.uploadImage({
        //                     record : _record,
        //                     data : myImageView.image,
        //                     username : Ti.App.Properties.getString('username'),
        //                     password : Ti.App.Properties.getString('password'),
        //                     onsuccess : (function(_image) {
        //                         activityIndicator.hide();
        //                         _record.image = _image
        //                         _args.onsuccess(_record);
        //                     }),
        //                     onerror : (function(e) {
        //                         activityIndicator.hide();
        //                         alert('error : ' + e.error);
        //                     }),
        //                 });            
        //             } else {
        //                 activityIndicator.hide();
        //                 _args.onsuccess(_record);
        //             }
        //             win.close();
        //         },
        //         onerror : function(e) {
        //             activityIndicator.hide();
        //             alert('error : ' + e.error);
        //        },
        //     });
        // });

        // var myImageView = si.ui.createMyImageView();

        // win.add(viewBase);
        // viewBase.add(viewHeader);
        // viewHeader.add(viewHeaderLeft);
        // viewHeaderLeft.add(myImageView);
        // viewHeader.add(viewHeaderRight);
        // viewHeaderRight.add(text);
        // viewHeaderRight.add(button);
        // viewBase.add(viewBody);
        // //viewBody.add(button);
        // win.add(activityIndicator);
        // win.name_field = text;
        // win.save_button = button;
        // win.set_image = function(_image) {
        //     myImageView.set_image(_image);
        // };

        // return win;
    };
})();
