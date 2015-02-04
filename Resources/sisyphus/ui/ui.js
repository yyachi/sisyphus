(function() {
    si.ui = {};

    si.ui.createApplicationTabGroup = function(_args) {
        var tabGroup = Ti.UI.createTabGroup({
            height : 300
        });
        
        var tabMain = Ti.UI.createTab({
            title : 'Main',
            icon : '/images/plus.png',
            window : si.ui.createAddChildWindow()
        });

        var tabSettings = Ti.UI.createTab({
            title : 'Options',
            icon : '/images/preferences.png',
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

        var imageButtonScan = si.ui.createImageButtonView('/images/barcode.png', {
            height : Ti.UI.SiZE
//            top : '5%',
//            right : 0,
//            width : '95%',
//            height : '95%'
        });

        var imageView = Ti.UI.createImageView({
            image : '/images/barcode.png'
        });


        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : '',
            width : '100%'
        }));

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
            width : '80%',
            left : 0,
            //backgroundColor : 'orange',
            layout : 'vertical'
        });
        var view_right = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '20%',
            right : 0,
            //backgroundColor : 'yellow',
        });

        view.add(view_left);
        view.add(view_right);
        view_left.add(text);

        view_right.add(button);
        view_right.add(imageView);

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
            var photoButtonView = si.ui.createImageButtonView('/images/167-upload-photo.png', {});
            photoButtonView.button.addEventListener('click', function(e) {
                optionDialog.show();
            });
            view.add(photoButtonView);
        } else {
            view.set_image(opts.image);
        }

        view.set_image = function(_image){
            view.removeAllChildren();

            var imageView = Ti.UI.createImageView({
                center : { x: '50%', y : '50%'},
                image : _image
            });
            imageView.addEventListener('click', function(e) {
                optionDialog.show();
            });
            view.add(imageView);
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

        var view = Ti.UI.createView({
            width : opts.width,
            height : opts.height
        });
        
        var button = Ti.UI.createButton({
            title : '',
            backgroundColor : 'white',
            width : '100%',
            height : '100%'
        });
        view.add(button);

        var imageView = Ti.UI.createImageView({
            image : _image,
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


        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : opts.value || '',
            width : '95%',
            top : '50%',
            //left : 0,
            keyboardType :  Ti.UI.KEYBOARD_URL,
            hintText : opts.hintText || ''
        }));
        win.text_field = text;

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



        var save_button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'save',
        }));

        save_button.addEventListener('click', function() {
            opts.save(win);
        });
        win.save_button = save_button;

        win.add(viewHeader);
        viewHeader.add(viewHeaderLeft);
        viewHeader.add(viewHeaderRight);
        viewHeaderLeft.add(text);        
        viewHeaderRight.add(imageButtonScan);
        win.add(save_button);
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
            top : metaHeight + 3,
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
                imageView.image = Ti.App.Properties.getString('server') + '/' + _record.image_path;
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
