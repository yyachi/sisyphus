(function() {

    si.ui.createAddChildWindow = function() {
        var parent = null;
        //var isMultiScan = !si.config.Medusa.debug;

        var win = Ti.UI.createWindow({
            title : 'Main',
            //backgroundColor : 'orange',
            barColor : '#336699',
            orientationModes : [Ti.UI.PORTRAIT],
            backButtonTitle : 'Back',
            layout : 'vertical'
        });

        win.addEventListener('focus', function(e) {
            Ti.API.info('focused.');
            changeMode('ready');
            current_global_id = Ti.App.Properties.getString('current_global_id');
            if (parent == null) {
                if (current_global_id != null) {
                    loadParent(current_global_id);
                }
            } else {
                if (parent.global_id != current_global_id) {
                    loadParent(current_global_id);
                }

            }

        });

        function changeMode(_mode) {
            //Ti.API.info('changeMode...');
            var isEnabled = true;
            if (_mode == 'loading') {
                isEnabled = false;
                viewParent.setEnabled(isEnabled);
                buttonScanChild.setEnabled(isEnabled);
                buttonNewStone.setEnabled(isEnabled);
                buttonNewBox.setEnabled(isEnabled);                
                imageButtonViewHome.setEnabled(isEnabled);
                printButton.setEnabled(isEnabled);
                imageButtonViewMenu.setEnabled(isEnabled);
                photoButton.setEnabled(isEnabled);
                return
            } else if (_mode == 'ready') {
                isEnabled = true;
                viewParent.setEnabled(isEnabled);
                buttonScanChild.setEnabled(isEnabled);
                buttonNewStone.setEnabled(isEnabled);
                buttonNewBox.setEnabled(isEnabled);                
                imageButtonViewHome.setEnabled(isEnabled);
                printButton.setEnabled(isEnabled);
                imageButtonViewMenu.setEnabled(isEnabled);
                photoButton.setEnabled(isEnabled);                
            } else {
                Ti.API.warn('changeMode unkown mode : ' + _mode );
            }


            if (Ti.App.Properties.getString('current_box_global_id') == null){
                imageButtonViewHome.button.setEnabled(false);
            }

            if (parent == null) {
                //Ti.API.info('no parent mode....');
                buttonScanChild.setEnabled(false);
                photoButton.setEnabled(false);
                printButton.setEnabled(false);
                imageButtonViewMenu.setEnabled(false);
            }

            if (!Ti.App.Properties.getBool('printLabel')){
//                Ti.API.info('no print mode...');
                printButton.setEnabled(false);
            }
        };


        var viewBase = Ti.UI.createView({
            //backgroundColor : 'red',
            top : 0,
            width : '100%',
            height : '100%',
            layout : 'vertical'
        });

        var viewUpper = Ti.UI.createView({
            //backgroundColor : 'red',
            //top : 0,
            layout : 'vertical',
            //height : '15%'
            height : '35%'
        });

        var viewToolBar = Ti.UI.createView({
            //backgroundColor : 'red',
            //top : 0,
            //layout : 'horizontal',
            //height : '15%'
            height : Ti.UI.SIZE
        });
        var viewToolLeft = Ti.UI.createView({
            //backgroundColor : 'yellow',
            left : 0,
            layout : 'horizontal',
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE
        });        
        var viewToolRight = Ti.UI.createView({
            //backgroundColor : 'white',
            right : 0,
            layout : 'horizontal',
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE
        });
        var viewHeader = Ti.UI.createView({
            //backgroundColor : 'red',
            //top : 0,
            //height : '20%'
            height : Ti.UI.SIZE
        });

        var viewBody = Ti.UI.createView({
            //backgroundColor : 'white',
            //top : 0,
            height : '15%',
            layout : 'vertical'
        });

        var viewButton = Ti.UI.createView({
            //backgroundColor : 'green',
            //top : 0,
            height : '45%',
            layout : 'vertical'
        });

        var viewFooter = Ti.UI.createView({
            //backgroundColor : 'blue',
            //bottom : 0,
            height : '5%',
            //layout : 'vertical'
        });

        var viewHeaderLeft = Ti.UI.createView({
            height : Ti.UI.SIZE,
            width : '100%',
            //width : Ti.UI.FILL,
            top : 0,
            left : 0,
        //    backgroundColor : 'white',
            layout : 'horizontal'
        });

        var viewHeaderRight = Ti.UI.createView({
            //height : '100%',
            height : Ti.UI.SIZE,
            width : '0%',
            top : 0,
            right : 0,
            //backgroundColor : 'white',
            layout : 'horizontal'
        });


        var imageButtonViewScanParent = si.ui.createImageButtonView('/images/glyphicons-86-repeat.png', {
//            top : '5%',
//            width : '100%',
//            height : '100%'
            left : '2%',
            width : 90,
            height : 90,
            imgDimensions : 30,

        });
        imageButtonViewScanParent.button.addEventListener('click', function(e) {
            scanAndLoadParent();
        });


        var imageButtonViewHome = si.ui.createImageButtonView('/images/glyphicons-21-home.png', {
            //top : '5%',
            //width : '50%',
            //height : '100%'
            //right : 0,
            width : 90,
            height : 90,
            imgDimensions : 30,
        });
        imageButtonViewHome.button.addEventListener('click', function(e) {
            default_global_id = Ti.App.Properties.getString('current_box_global_id');
            if (default_global_id === null){
                si.ui.myAlert({message:'Set your home first', title:''});
            } else {
                loadParent(default_global_id);
            }
        });


        var imageButtonViewMenu = si.ui.createImageButtonView('/images/glyphicons-137-cogwheel.png', {
            //top : '5%',
            //width : '50%',
            //height : '100%'
            //right : 0,
            width : 90,
            height : 90,
            imgDimensions : 30,
        });
        imageButtonViewMenu.button.addEventListener('click', function(e) {
            if (parent) {
                optionDialogForMenu.show();
            } else {
                si.ui.alert_no_parent();
            }

        });

        var printButton = si.ui.createImageButtonView('/images/glyphicons-16-print.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.printLabelforParent(e) }
        });
        win.printLabelforParent = function(e) {
            Ti.API.info('printLabel...');
            Ti.API.info(e);
            if (!Ti.App.Properties.getBool('printLabel')){
                si.ui.myAlert({message: 'Turn label on'});
                return;
            }

            if (parent == null){
                si.ui.alert_no_parent();
                return;
            }

            win.printLabelfor(parent);
        }
        win.printLabelfor = function(_record){
            Ti.API.info('printLabelfor...');
            si.ui.android.printLabel(_record.global_id, _record.name, {
                onsuccess: function(e){
                    si.sound_label.play();
                    labelInfo.text = _record.global_id + '...' + _record.name + '...label created\n' + labelInfo.text;
                },
                onerror: function(e){
                    var dialog = Ti.UI.createAlertDialog({
                        message: e.error,
                        title: 'No label created',
                    });
                    dialog.show();
                    si.sound_error.play();
                    labelInfo.text = _record.global_id + '...' + _record.name + '...no label created\n' + labelInfo.text;
                }
            });
        };

        win.printButton = printButton;

        //var photoButton = si.ui.createImageButtonView('/images/glyphicons-12-camera.png', {
        var photoButton = si.ui.createImageButtonView('/images/glyphicons-63-paperclip.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.clickphotoButton() }
        });
        win.photoButton = photoButton;

        var optionDialogForMenu = Ti.UI.createOptionDialog({
            options : ['Open with browser'],
            //cancel : 2,
            title : ''
        });
        optionDialogForMenu.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                    var url = si.model.medusa.getResourceURLwithAuth(parent);
                    Ti.Platform.openURL(url);
                    break;
                // case 1:
                //     if (parent) {
                //         uploadImageFromAlbum();
                //     } else {
                //         si.ui.alert_no_parent();
                //         //si.ui.myAlert({message:'Load parent first', title:''});
                //         //si.ui.alert_simple('Please load parent first');
                //     }
                //     break;
                // case 2:
                //     if (parent) {
                //         si.ui.android.printLabel(parent.global_id, parent.name);
                //     } else {
                //         si.ui.alert_simple('please load parent first');
                //     }
                //     break;
                default:
                    break;
            };
        });


        win.clickphotoButton = function(){
            Ti.API.info('clickphotoButton...');
            Ti.API.info(parent);
            if (parent == null){
                si.ui.alert_no_parent();
                return;
            }

            var optionDialog = Ti.UI.createOptionDialog({
                options : ['Add snapshot', 'Add local file'],
                title : ''
            });
            optionDialog.addEventListener('click', function(e){
                switch (e.index) {
                    case 0:
                        uploadImageFromCamera();
                        break;
                    case 1:
                        uploadImageFromAlbum();
                        break;
                    default:
                        break;
                };
            });
            optionDialog.show();
        };

        // var optionDialogForAdd = Ti.UI.createOptionDialog({
        //     options : ['stone', 'box', 'cancel'],
        //     cancel : 2,
        //     title : ''
        // });
        // optionDialogForAdd.addEventListener('click', function(e) {
        //     switch (e.index) {
        //         case 0:
        //             var windowNewStone = si.ui.createNewStoneWindow({
        //                 onsuccess: function(_new){
        //                     if (parent){
        //                         addChild(_new.global_id, false);
        //                     }
        //                     si.ui.android.printLabel(_new.global_id, _new.name);
        //                 }
        //             });
        //             if (parent && parent._className === 'Stone'){
        //                 windowNewStone.name_field.value = parent.name;
        //             }
        //             si.app.tabGroup.activeTab.open(windowNewStone, {
        //                 animated : true
        //             });
        //             break;
        //         case 1:
        //             var windowNewBox = si.ui.createNewBoxWindow({
        //                 onsuccess: function(_new){
        //                     if (parent){
        //                         addChild(_new.global_id, false);
        //                     }
        //                     si.ui.android.printLabel(_new.global_id, _new.name);
        //                 }
        //             });
        //             si.app.tabGroup.activeTab.open(windowNewBox, {
        //                 animated : true
        //             });
        //             break;
        //         default:
        //             break;
        //     };
        // });



        function uploadImageFromAlbum() {
            Ti.Media.openPhotoGallery({
                success : function(event) {
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        setImageView(event.media);
                    }
                },
                cancel : function() {
                },
                error : function(error) {
                },
                allowEditing : true,
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
            });
        }

        function uploadImageFromCamera() {
            Ti.Media.showCamera({
                success : function(event) {
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        setImageView(event.media);
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
        }

        function setImageView(_image) {
            Ti.API.info('image:' + _image);
            Ti.API.info('getFile:' + _image.getFile());
            Ti.API.info('getMimeType:' + _image.getNativePath());

            labelStatus.text = 'Path:' + _image.getNativePath();

//            viewBody.remove(buttonScanChild);
//            imageView.setImage(_image);
//            viewBody.add(imageView);

            if (parent) {
                handleImageEvent(_image);
            }
        };

        function handleImageEvent(_image) {
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');

            labelStatus.text = 'Uploading ' + _image.getNativePath() + ' ...';
            changeMode('loading');

            si.model.medusa.uploadImage({
                data : _image,
                record : parent,
                username : username,
                password : password,
                onsuccess : function(_response) {
                    si.sound_created.play();
                    labelStatus.text += ' OK\n';
                    labelInfo.text = labelStatus.text + labelInfo.text;
                    loadParent(parent.global_id);
                },
                onerror : function(e) {
                    var dialog = Ti.UI.createAlertDialog({
                        message: e.error,
                        title: 'No image uploaded',
                    });
                    dialog.show();
                    si.sound_error.play();

                    labelStatus.text += 'ERROR\n';
                    labelInfo.text = labelStatus.text + labelInfo.text;
                    labelStatus.text = 'Ready for scan';
                    changeMode('ready');
                }
            });
        }





        var viewParent = si.ui.createViewParent(null, {
            width : '100%',
            height : Ti.UI.SIZE,
            imgDimensions : 80,
        });
        // viewParent.addEventListener('click', function(e) {
        //     scanAndLoadParent();
        // });



        var imageView = Ti.UI.createImageView({
            backgroundColor : 'black',
            top : '30%',
            width : '80%',
            height : '63%',
        });


        var scrollView = Ti.UI.createScrollView({
            //top : '2%',
            contentHeight : 'auto',
            contentWidth : 'auto',
            //backgroundColor : 'white',
            width : '80%',
            left : '10%',
            height : Ti.UI.FILL,
            borderWidth : 1,
            //borderColor : 'gray',
            borderRadius : 10,
            scrollType : 'vertical'
        });

        var labelInfo = Ti.UI.createLabel(si.combine($$.logText, {
            text : '',
            top : 0,
            left : 0,
            width : '100%',
            height : 'auto',
            textAlign : 'left'
        }));

        var labelStatus = Ti.UI.createLabel(si.combine($$.logText, {
            text : '',
            textAlign : 'left',
            //top : '95%',
            left : '3%',
            width : '90%',
            borderWidth : 1,
        }));

        var buttonfont = {fontSize: 36};
        //var imageButtonViewAdd = si.ui.createImageButtonView('/images/plus.png', {
        var buttonNewStone = Ti.UI.createButton(si.combine($$.NormalButton, {
            top : '2%',
            // width : '30%',
            // height : '90%'
            title : 'New stone',
            font : buttonfont,
//            width : '100%',
            borderRadius : 10,
            //top : '30%',
            width : '80%',
            height : '30%'
        }));
        buttonNewStone.addEventListener('click', function(e) {
            //optionDialogForAdd.show();
            var windowNewStone = si.ui.createNewStoneWindow({
                onsuccess: function(_new){
                    labelStatus.text = _new.global_id + '...' + _new.name + '...';
                    si.sound_created.play();
                    labelInfo.text = labelStatus.text + 'created\n' + labelInfo.text;
                    labelStatus.text = 'Ready for scan'
                    if (parent){
                        addChild(_new.global_id, false);
                    }
                    win.printLabelfor(_new);
                }
            });
            if (parent && parent._className === 'Stone'){
                windowNewStone.name_field.value = parent.name;
            }
            si.app.tabGroup.activeTab.open(windowNewStone, {
                animated : true
            });
        });

        var buttonNewBox = Ti.UI.createButton(si.combine($$.NormalButton, {
            top : '2%',
            // width : '30%',
            // height : '90%'
            title : 'New box',
            font : buttonfont,
//            font : {fontSize:36},
//            width : '100%',
            borderRadius : 10,
            //top : '30%',
            width : '80%',
            height : '30%'
        }));
        buttonNewBox.addEventListener('click', function(e) {
            //optionDialogForAdd.show();
            var windowNewBox = si.ui.createNewBoxWindow({
                onsuccess: function(_new){
                    labelStatus.text = _new.global_id + '...' + _new.name + '...';
                    si.sound_created.play();
                    labelInfo.text = labelStatus.text + 'created\n' + labelInfo.text;
                    labelStatus.text = 'Ready for scan'
                    if (parent){
                        addChild(_new.global_id, false);
                    }
                    win.printLabelfor(_new);
                }
            });
            si.app.tabGroup.activeTab.open(windowNewBox, {
                animated : true
            });
        });


        var buttonScanChild = Ti.UI.createButton(si.combine($$.NormalButton, {
            title : 'Scan barcode',
//            width : '100%',
            //backgroundColor : 'white',
            //borderWidth : 1,
            //borderColor : 'black',
//            font : {fontSize:36},
            font : buttonfont,
            borderRadius : 10,
            top : '2%',
            //bottom : 0,
            width : '80%',
            height : '30%'
        }));
        buttonScanChild.addEventListener('click', function() {
            if (parent){
                scanChild();
            } else {
                si.ui.alert_no_parent();                
                //si.ui.myAlert({message:'Load parent first.', title:''});
            }            
        });



        function scanAndLoadParent() {
            if (!si.config.Medusa.debug) {
                si.TiBar.scan({
                    configure : si.config.TiBar,
                    success : function(_data) {
                        if (_data && _data.barcode) {
                            loadParent(_data.barcode);
                        }
                    },
                    cancel : function() {
                    },
                    error : function() {
                    }
                });
            } else {
                setTimeout(function() {
                    loadParent(si.config.debug.parent_global_id);
                }, 1000);
            }
        };

        win.set_parent = function(_parent){
            parent = _parent;
        };
        function loadParent(_global_id) {
            Ti.API.info('loadParent...');
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');
            changeMode('loading');

            //labelInfo.text = '';
            labelStatus.text = 'Interacting with ' + Ti.App.Properties.getString('server');

            si.model.medusa.getRecordFromGlobalId({
                global_id : _global_id,
                username : username,
                password : password,
                onsuccess : function(_response) {
                    Ti.API.info('success');
                    parent = _response;
                    viewParent.update(parent);
                    if (_global_id != Ti.App.Properties.getString('current_global_id')) {
                        Ti.App.Properties.setString('current_global_id', _global_id);
                    }
                    viewHeaderLeft.removeAllChildren();
                    viewHeaderLeft.add(viewParent);
                    // if (viewHeaderLeft.children.contains(imageButtonViewScanParent)) {
                    //     Ti.API.info('.....');
                    //     viewHeaderLeft.remove(imageButtonViewScanParent);
                    // }
                    // Ti.API.info('bbbb');
                    // if (!viewHeaderLeft.children.contains(viewParent)) {
                    //     Ti.API.info('******');
                    //     viewHeaderLeft.add(viewParent);
                    // }
                    //si.sound_newmail.play();
                    si.sound_reminder.play();
                    labelStatus.text = 'Ready for scan';
                    changeMode('ready');
                },
                onerror : function(e) {
                    Ti.API.info('error');
                    viewHeaderLeft.removeAllChildren();
//                    viewHeaderLeft.add(imageButtonViewScanParent);                    
                    // if (!viewHeaderLeft.children.contains(imageButtonViewScanParent)) {
                    //     viewHeaderLeft.add(imageButtonViewScanParent);
                    // }
                    // if (viewHeaderLeft.children.contains(viewParent)) {
                    //     viewHeaderLeft.remove(viewParent);
                    // }
                    labelStatus.text = 'ERROR';
                }
            });
        };

        function scanChild() {
            if (!si.config.Medusa.debug) {
                si.TiBar.scan({
                    configure : si.config.TiBar,
                    success : function(_data) {
                        if (_data && _data.barcode) {
                            addChild(_data.barcode, true);
                        }
                    },
                    cancel : function() {
                    },
                    error : function() {
                    }
                });
            } else {
                setTimeout(function() {
                    addChild(si.config.debug.child_global_id, false);
                }, 1000);
            }
        };

        function addChild(_global_id, isMultiScan) {
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');

            changeMode('loading');
            labelStatus.text = _global_id + '...';

            si.model.medusa.getRecordFromGlobalId({
                global_id : _global_id,
                username : username,
                password : password,
                onsuccess : function(_response) {
                    labelStatus.text += _response.name + '...';
                    si.model.medusa.createLink(parent, _response, {
                        username : username,
                        password : password,
                        onsuccess : function(_response2) {
                            labelStatus.text += 'stored\n';
                            si.sound_newmail.play();
                            labelInfo.text = labelStatus.text + labelInfo.text;

                            if (isMultiScan) {
                                buttonScanChild.setEnabled(true);
                                buttonScanChild.fireEvent('click');
                            } else {
                                labelStatus.text = 'Ready for scan';
                                changeMode('ready');
                            }
                        },
                        onerror : function(e) {
                            labelStatus.text = labelStatus.text + 'ERROR\n';
                            si.sound_mailerror.play();
                        }
                    });
                },
                onerror : function(e) {
                    labelStatus.text = labelStatus.text + 'ERROR\n';
                    si.sound_mailerror.play();
                }
            });
        };


        win.add(viewBase);
        viewBase.add(viewUpper);
        viewUpper.add(viewToolBar);

        viewBase.add(viewToolBar);
        viewToolBar.add(viewToolLeft);
        viewToolBar.add(viewToolRight);        

        viewToolLeft.add(imageButtonViewHome);
        viewToolLeft.add(imageButtonViewScanParent);
        viewToolRight.add(photoButton);        
        viewToolRight.add(printButton);
        viewToolRight.add(imageButtonViewMenu);        

        viewUpper.add(viewHeader);
        viewHeader.add(viewHeaderLeft);
        viewHeader.add(viewHeaderRight);
        viewBase.add(viewBody);
        //viewBody.add(labelStatus);
        viewBody.add(scrollView);
        scrollView.add(labelInfo);
        viewButton.add(buttonNewStone);
        viewButton.add(buttonNewBox)        
        viewButton.add(buttonScanChild);
        viewBase.add(viewButton);
        viewFooter.add(labelStatus);
        viewBase.add(viewFooter);
        win.addChild = addChild;
        win.loadParent = loadParent;
        win.labelStatus = labelStatus;
        return win;
    };
})();
