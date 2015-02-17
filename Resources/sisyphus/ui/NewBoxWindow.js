(function() {
    si.ui.createNewBoxWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'new box',
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
            backgroundColor : 'red',
            height : '25%'
        });

        var viewBody = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0,
            top : 0,
            height : '85%'
        });

        var viewHeaderLeft = Ti.UI.createView({
            height : '100%',
            width : '20%',
            top : 0,
            left : 0,
            backgroundColor : 'white',
        });

        var viewHeaderRight = Ti.UI.createView({
            height : '100%',
            width : '80%',
            top : 0,
            right : 0,
            backgroundColor : 'white',
            layout : 'vertical'
        });

        var viewHeaderRight1 = Ti.UI.createView({
            height : '50%',
            width : '100%',
            top : 0,
            right : 0,
            backgroundColor : 'white',
            //layout : 'horizontal'
        });

        var viewHeaderRight2 = Ti.UI.createView({
            height : '50%',
            width : '100%',
            top : 0,
            right : 0,
            backgroundColor : 'white',
            //layout : 'horizontal'
        });

        var activityIndicator = Ti.UI.createActivityIndicator({
            style : Ti.UI.ActivityIndicatorStyle.BIG,
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : '',
         //   top : '2%',
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input name'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'OK',
            top : 0
        }));

        button.addEventListener('click', function() {
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
            keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'input ID'
        }));

        var myImageView = si.ui.createMyImageView();
        win.add(viewBase);
        viewBase.add(viewHeader);
        viewHeader.add(viewHeaderLeft);
        viewHeaderLeft.add(myImageView);

        viewHeader.add(viewHeaderRight);
        if (!Ti.App.Properties.getInt('printLabel')){
            viewHeaderRight.add(viewHeaderRight1);
            viewHeaderRight1.add(scan_input);
            viewHeaderRight.add(viewHeaderRight2);        
            viewHeaderRight2.add(text);
        } else {
            viewHeaderRight.add(viewHeaderRight1);
            viewHeaderRight1.add(text);
        }
        //viewHeaderRight.add(button);
        viewBase.add(viewBody);
        viewBody.add(button);
        viewBody.add(cancel_button);

        win.add(activityIndicator);
        win.name_field = text;
        win.save_button = button;
        win.set_image = function(_image) {
            myImageView.set_image(_image);
        };
        win.set_global_id = function(gid) {
            scan_input.set_value(gid);
        }
        win.global_id = scan_input.input;
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
