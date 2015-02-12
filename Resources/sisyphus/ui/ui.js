(function() {
    si.ui = {};


    si.ui.createApplicationTabGroup = function(_args) {
        var tabGroup = Ti.UI.createTabGroup({
            height : 300
        });
        
        var tabMain = Ti.UI.createTab({
            title : 'Main',
            //icon : '/images/plus.png',
            window : si.ui.createAddChildWindow()
        });

        var tabSettings = Ti.UI.createTab({
            title : 'Options',
            //icon : '/images/preferences.png',
            window : si.ui.createSettingsWindow()
        });

        tabGroup.addTab(tabMain);
        tabGroup.addTab(tabSettings);
        return tabGroup;
    };

    si.ui.createScanInput = function(opts){
        var view = Ti.UI.createView({
            height : Ti.UI.SIZE,
            //backgroundColor : 'red',
            layout : 'horizontal'
        });

        var text = Ti.UI.createTextField(opts);

        var imageView = Ti.UI.createImageView({
            image : '/images/barcode.png'
        });


        var button = Ti.UI.createButton({
            title : '',
            //borderColor : 'black',
            //borderRadius : 5,
            //backgroundColor : 'white',
            width : '90%'
        });

        button.addEventListener('click', function(e) {
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
        imageView.addEventListener('click', function(e) {
            button.fireEvent('click', e);
        });


        var view_left = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '10%',
            left : 0,
            //backgroundColor : 'orange',
            //layout : 'vertical'
        });
        var view_right = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '90%',
            right : 0,
            //backgroundColor : 'yellow',
        });

        view.add(view_left);
        view.add(view_right);
        view_right.add(text);

        view_left.add(button);
        view_left.add(imageView);

        view.set_value = function(value){
            text.value = value;
        }
        view.input = text;

        return view;
    }

    si.ui.createMyImageView = function(opts){
        if ( typeof opts == 'undefined') {
            opts = {};
        };
        if (!('width' in opts)) {
            opts.width = '100%';
        }
        if (!('height' in opts)) {
            opts.height = '100%';
        }

        var view = Ti.UI.createView({
            width : opts.width,
            height : opts.height            
        });

        var optionDialog = Ti.UI.createOptionDialog({
            options : ['add a snap shot', 'add a local file', 'cancel'],
            cancel : 2,
            title : ''
        });
        optionDialog.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                    Ti.Media.showCamera({
                        success : function(event) {
                            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                                view.set_image(event.media);
                            }
                        },
                        cancel : function() {
                        },
                        error : function(error) {
                        },
                        saveToPhotoGallery : true,
                        allowEditing : true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
                    });
                    break;
                case 1:
                    Ti.Media.openPhotoGallery({
                        success : function(event) {
                            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                                view.set_image(event.media);
                            }
                        },
                        cancel : function() {
                        },
                        error : function(error) {
                        },
                        allowEditing : true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
                    });
                    break;
                default:
                    break;
            };
        });

        if (!opts.image){
            var photoButtonView = si.ui.createImageButtonView('/images/167-upload-photo.png', {
                width : 90,
                height : 90,
                imgDimensions : 30
            });
            photoButtonView.button.addEventListener('click', function(e) {
                optionDialog.show();
            });
            view.add(photoButtonView);
        } else {
            view.set_image(opts.image);
        }

        view.set_image = function(_image){
            view.removeAllChildren();
            var flame = Ti.UI.createView({
                height : '95%',
                width : '95%',
                backgroundColor : 'black'
            });
            var imageView = Ti.UI.createImageView({
                center : { x: '50%', y : '50%'},
                image : _image
            });
            imageView.addEventListener('click', function(e) {
                optionDialog.show();
            });
            view.add(flame);
            flame.add(imageView);
            view.image = _image;
        }

        return view;
    };

    si.ui.createImageButtonView = function(_image, opts) {
        if ( typeof opts == 'undefined') {
            opts = {};
        };
        if (!('width' in opts)) {
            opts.width = '100%';
        }
        if (!('height' in opts)) {
            opts.height = '100%';
        }
        if (!('imgDimensions' in opts)) {
            opts.imgDimensions = 45;
        }

        var view = Ti.UI.createView(opts);
        
        var button = Ti.UI.createButton({
            title : '',
            //backgroundColor : 'white',
            width : '100%',
            height : '100%'
        });
        view.add(button);

        var imageView = Ti.UI.createImageView({
            image : _image,
            //backgroundColor : 'blue',
            width : opts.imgDimensions,
            height : opts.imgDimensions            
        });
        imageView.addEventListener('click', function(e) {
            button.fireEvent('click', e);
        });
        view.add(imageView);

        var self = view;
        self.button = button;
        self.imageView = imageView;
        self.setEnabled = function(value) {
            self.button.setEnabled(value);
            self.imageView.setTouchEnabled(value);
        };
        return self;
    };

    si.ui.createInputOrScanWindow = function(opts){
        if ( typeof opts === 'undefined') {
            opts = {};
        }

        var win = Ti.UI.createWindow({
            title : opts.title || 'ScanInput',
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


        var scan_input = si.ui.createScanInput(si.combine($$.TextField, {
            value : opts.value || '',
            keyboardType : opts.keyboardType || Ti.UI.KEYBOARD_DEFAULT,
            hintText : opts.hintText || ''
        }));

        var cancel_button = Ti.UI.createButton(si.combine($$.LeftBottomButton, {
            top : 0,
            title : 'cancel',
        }));

        cancel_button.addEventListener('click', function() {
            win.close();
        });


        var save_button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            top : 0,
            title : 'OK',
        }));

        save_button.addEventListener('click', function() {
            opts.save(scan_input.input.value);
        });

        win.save_button = save_button;

        win.add(viewBase);
        viewBase.add(viewHeader);
        viewBase.add(viewBody);

        viewHeader.add(scan_input);
        viewBody.add(cancel_button);
        viewBody.add(save_button);

        win.set_value = function(value) {
            scan_input.set_value(value);
        }
        win.input = scan_input.input;

        return win;        
    };

    si.ui.createViewParent = function(_record, opts) {
        if ( typeof opts === 'undefined') {
            opts = {};
        }
        if (!('width' in opts)) {
            opts.width = '100%';
        }
        if (!('height' in opts)) {
            opts.height = '100%';
        }
        if (!('imgDimensions' in opts)) {
            opts.imgDimensions = 45;
        }

        spacing = 5;
        nameHeight = '50%';
        metaHeight = 14;
        var view = Ti.UI.createView({
            width : opts.width,
            height : opts.height
        });
        var imageView = Ti.UI.createImageView({
            top : spacing,
            left : spacing,
            height : opts.imgDimensions,
            width : opts.imgDimensions,
            backgroundColor : '#000000',
            image : null
        });
        view.add(imageView);

        var avatarOffset = spacing * 2 + opts.imgDimensions;

        var labelMeta = Ti.UI.createLabel(si.combine($$.smallText, {
            text : '',
            top : spacing,
            left : avatarOffset,
            right : spacing,
            height : 'auto',
            textAlign : 'left'
        }));
        view.add(labelMeta);

        var labelName = Ti.UI.createLabel(si.combine($$.boldHeaderText, {
            text : '',
            top : metaHeight + 10,
            left : avatarOffset,
            height : nameHeight
        }));
        view.add(labelName);

        update = function(_record) {
            if (_record == null) {
                labelMeta.text = '';
                labelName.text = '';
                imageView.image = '';
                return;
            }
            labelMeta.text = _record.global_id;
            labelName.text = _record.name;
            //!!!!!!!!!画像のパスの取得は要検討!!!!!!!!!!!!!!!!!!!!!!
            if (_record.image_path) {
                //Ti.API.info("image_path");
                //Ti.API.info(_record.image_path);
                //var _path = Ti.App.Properties.getString('server') + '/' + _record.image_path;
                var _url = si.imageURL(_record.image_path);
                //Ti.API.info(_url);
                imageView.image = _url;
            } else {
                imageView.image = '';
            }
        };

        var self = view;
        self.imageView = imageView;
        self.labelMeta = labelMeta;
        self.labelName = labelName;
        self.update = update;
        self.update(_record);
        return self;
    };

})();

Ti.include('/sisyphus/ui/styles.js');
Ti.include('/sisyphus/ui/LoginWindow.js');
Ti.include('/sisyphus/ui/SettingsWindow.js');
Ti.include('/sisyphus/ui/PrintServerSettingWindow.js');
Ti.include('/sisyphus/ui/PrintFormatUrlSettingWindow.js');
Ti.include('/sisyphus/ui/ServerSettingWindow.js');
Ti.include('/sisyphus/ui/NewStoneWindow.js');
Ti.include('/sisyphus/ui/NewBoxWindow.js');

//if (Ti.Platform.name == 'iPhone OS') {
//        Ti.include('/sisyphus/ui/AddChildWindow.js');
//}

if (Ti.Platform.osname == 'android') {
    Ti.include('/sisyphus/ui/android/AddChildWindow.js');
}
