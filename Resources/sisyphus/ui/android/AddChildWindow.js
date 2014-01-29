(function() {
    si.ui.createAddChildWindow = function() {

        var debug = si.config.Medusa.testMode;
        if (debug) {
            debug_parent_global_id = '20110416135129-112-853';
            debug_child_global_id = '20110416134901-075-241';
        }

        var parent = null;
        var isMultiScan = false;
        var controlable = true;

        var win = Ti.UI.createWindow({
            title : 'Main',
            backgroundColor : 'orange',
            barColor : '#336699',
            orientationModes : [Titanium.UI.PORTRAIT],
            backButtonTitle : 'Back',
            layout : 'vertical'
        });

        var viewBase = Ti.UI.createView({
            backgroundColor : 'blue',
            top : 5,
            width : $$.platformWidth,
            layout : 'vertical'
        });
        win.add(viewBase);

        var viewHeader = Ti.UI.createView({
            backgroundColor : 'red',
            top : 0,
        });
        viewBase.add(viewHeader);

        var viewBody = Ti.UI.createView({
            backgroundColor : 'white',
            top : 0,
        });
        viewBase.add(viewBody);

        var viewFooter = Ti.UI.createView({
            backgroundColor : 'black',
            top : 20,
        });
        viewBase.add(viewFooter);

        var viewHeaderLeft = Ti.UI.createView({
            height : '100%',
            width : '70%',
            top : 0,
            left : 0,
            backgroundColor : 'white',
        });
        viewHeader.add(viewHeaderLeft);

        var viewHeaderRight = Ti.UI.createView({
            height : '100%',
            width : '30%',
            top : 0,
            right : 0,
            backgroundColor : 'white',
            layout : 'horizontal'
        });
        viewHeader.add(viewHeaderRight);

        var imageButtonViewHome = si.ui.createImageButtonView('/images/home.png', {
            Top : '5%',
            width : '50%',
            height : '90%'
        });
        imageButtonViewHome.button.addEventListener('click', function(e) {
            default_global_id = Titanium.App.Properties.getString('current_box_global_id');
            loadParent(default_global_id);
        });
        viewHeaderRight.add(imageButtonViewHome);

        var optionDialogForMenu = Titanium.UI.createOptionDialog({
            options : [ 'print label',
                        'add a snap shot', 
                        'add a local file', 
                        'cancel'
                        ],
            cancel : 3,
            title : ''
        });
        optionDialogForMenu.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                    if (parent) {
                        printLabelAtRemote(parent.global_id);
                    } else {
                        alert('please load parent first');
                    }
                    break;
                case 1:
                    if (parent) {
                        uploadImageFromCamera();
                    } else {
                        alert('please load parent first');
                    }
                    break;
                case 2:
                    if (parent) {
                        uploadImageFromAlbum();
                    } else {
                        alert('please load parent first');
                    }
                    break;
                default:
                    break;
            };
        });

        var imageButtonViewMenu = si.ui.createImageButtonView('/images/19-gear.png', {
            Top : '5%',
            width : '50%',
            height : '90%'
        });
        imageButtonViewMenu.button.addEventListener('click', function(e) {
            optionDialogForMenu.show();
        });
        viewHeaderRight.add(imageButtonViewMenu);

        var imageButtonViewScanParent = si.ui.createImageButtonView('/images/01-refresh.png', {
            Top : '5%',
            width : '100%',
            height : '90%'
        });
        callbackButtonScanParentClick = function(e) {
            if (!debug) {
                scanAndLoadParent();
            } else {
                setTimeout(function() {
                    loadParent(debug_parent_global_id);
                }, 1000);
            }
        };
        imageButtonViewScanParent.button.addEventListener('click', callbackButtonScanParentClick);
        viewHeaderLeft.add(imageButtonViewScanParent);

        //viewParentは動的に追加、削除される
        var viewParent = si.ui.createViewParent(null, {
            width : '100%',
            height : '100%',
            imgDimensions : 80,
        });
        viewParent.addEventListener('click', callbackButtonScanParentClick);

        function printLabelAtRemote(global_id) {

            var host = Titanium.App.Properties.getString('socket_server');
            var port = Titanium.App.Properties.getString('socket_write_to');

            try {
                socket = Ti.Network.Socket.createTCP({
                    host : host,
                    port : port,
                    connected : function(e) {
                        e.socket.write(Ti.createBuffer({
                            value : global_id + '\r\n'
                        }));
                        e.socket.write(Ti.createBuffer({
                            value : 'label\r\n'
                        }));
                        e.socket.write(Ti.createBuffer({
                            value : 'pop\r\n'
                        }));
                        e.socket.close();
                    },
                    error : function(e) {
                        alert(host + ':' + port + '\nConnection refused.');
                    },
                    closed : function(e) {
                    }
                });
                socket.connect();
            } catch (e) {
                alert('Could not send command to ' + host + ':' + port);
            }
        };

        function setImageView(_image) {
            Ti.API.info('image:' + _image);
            Ti.API.info('getFile:' + _image.getFile());
            Ti.API.info('getMimeType:' + _image.getNativePath());
            labelStatus.text = 'Path:' + _image.getNativePath();
            
            viewBody.remove(buttonScanChild);
            imageView.setImage(_image);
            viewBody.add(imageView);
            
            if (parent) {
                handleImageEvent(_image);
            }
        };

        function handleImageEvent(_image) {
            labelStatus.text = 'uploading ' + _image.getNativePath() + ' ...';
            changeMode('loading');

            si.model.medusa.uploadImage({
                image : _image,
                record : parent,
                username : Titanium.App.Properties.getString('username'),
                password : Titanium.App.Properties.getString('password'),
                onsuccess : function(e) {
                    labelStatus.text += ' OK';
                    
                    viewBody.remove(imageView);
                    viewBody.add(buttonScanChild);
                    loadParent(parent.global_id);
                },
                onerror : function(e) {
                    labelStatus.text += 'ERROR';
                    labelInfo.text = labelStatus.text + labelInfo.text;
                    
                    viewBody.remove(imageView);
                    viewBody.add(buttonScanChild);
                    
                    changeMode('ready');
                }
            });
        }

        function uploadImageFromAlbum() {
            Titanium.Media.openPhotoGallery({
                success : function(event) {
                    if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
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
            Titanium.Media.showCamera({
                success : function(event) {
                    if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
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

        var scrollView = Titanium.UI.createScrollView({
            top : '2%',
            contentHeight : 'auto',
            contentWidth : 'auto',
            backgroundColor : 'white',
            width : '80%',
            left : '10%',
            height : '25%',
            borderWidth : 1,
            borderRadius : 0
        });
        viewBody.add(scrollView);

        var labelInfo = Titanium.UI.createLabel(si.combine($$.smallText, {
            text : '',
            top : 0,
            left : 0,
            width : '100%',
            height : 'auto',
            textAlign : 'left'
        }));
        scrollView.add(labelInfo);

        var imageView = Ti.UI.createImageView({
            backgroundColor : 'black',
            top : '30%',
            width : '80%',
            height : '63%',
        });

        var buttonScanChild = Titanium.UI.createButton(si.combine($$.NormalButton, {
            title : '+',
            width : '100%',
            backgroundColor : 'white',
            borderWidth : 1,
            borderColor : 'black',
            borderRadius : 10,
            top : '30%',
            width : '80%',
            height : '63%',
        }));
        buttonScanChild.addEventListener('click', function() {
            if (!debug) {
                scanChild();
            } else {
                setTimeout(function() {
                    addChild(debug_child_global_id);
                }, 1000);
            }
        });
        viewBody.add(buttonScanChild);

        var labelStatus = Ti.UI.createLabel(si.combine($$.smallText, {
            text : '',
            textAlign : 'left',
            top : '95%',
            left : '3%',
            width : '90%',
            borderWidth : 1,
        }));
        viewBody.add(labelStatus);

        var switchLock = Titanium.UI.createSwitch({
            value : !controlable,
            left : '2%',
            bottom : '2%'
        });
        switchLock.addEventListener('change', function(e) {
            controlable = !switchLock.value;
            imageButtonViewHome.setEnabled(controlable);
            imageButtonViewMenu.setEnabled(controlable);
            viewParent.setEnabled(controlable);
        });
        viewFooter.add(switchLock);

        win.addEventListener('focus', function(e) {
            refreshLayout();
            current_global_id = Titanium.App.Properties.getString('current_global_id');
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

        function refreshLayout() {
            viewBase.setHeight('100%');
            viewBase.setWidth('100%');
            viewBase.setTop(0);
            viewHeader.setHeight('15%');
            viewHeader.setTop(0);
            viewBody.setHeight('75%');
            viewBody.setTop(0);
            viewFooter.setHeight('10%');
            viewFooter.setTop(0);
        };

        function scanAndLoadParent() {
            si.TiBar.scan({
                configure : si.config.TiBar,
                success : function(data) {
                    if (data && data.barcode) {
                        global_id = data.barcode;
                        loadParent(global_id);
                    }
                },
                cancel : function() {
                },
                error : function() {
                }
            });
        };

        function scanChild() {
            si.TiBar.scan({
                configure : si.config.TiBar,
                success : function(data) {
                    if (data && data.barcode) {
                        addChild(data.barcode);
                    }
                },
                cancel : function() {
                },
                error : function() {
                }
            });
        };

        function addChild(_global_id) {
            changeMode('loading');

            labelStatus.text = _global_id + '...';
            si.model.medusa.getRecordFromGlobalId({
                global_id : _global_id,
                username : Titanium.App.Properties.getString('username'),
                password : Titanium.App.Properties.getString('password'),
                onsuccess : function(child) {
                    labelStatus.text += child.name + '...';
                    si.model.medusa.createLink(parent, child, {
                            username : Titanium.App.Properties.getString('username'),
                            password : Titanium.App.Properties.getString('password'),
                            onsuccess : function() {
                            labelStatus.text += 'OK\n';
                            si.sound_newmail.play();
                            labelInfo.text = labelStatus.text + labelInfo.text;
                            if (isMultiScan) {
                                buttonScanChild.setEnabled(true);
                                buttonScanChild.fireEvent('click');
                            } else {
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

        function changeMode(_mode) {
            if (_mode == 'loading') {
                viewParent.setVisible(false);
                buttonScanChild.setEnabled(false);

                imageButtonViewHome.setEnabled(false);
                imageButtonViewMenu.setEnabled(false);
                viewParent.setEnabled(false);
            } else if (_mode == 'record_load_error') {
                viewParent.setVisible(true);
                buttonScanChild.setEnabled(false);

                controlable = true;
                switchLock.setValue(!controlable);
                imageButtonViewHome.setEnabled(controlable);
                imageButtonViewMenu.setEnabled(controlable);
                viewParent.setEnabled(controlable);
             } else if (_mode == 'ready') {
                viewParent.setVisible(true);
                buttonScanChild.setEnabled(true);

                imageButtonViewHome.setEnabled(controlable);
                imageButtonViewMenu.setEnabled(controlable);
                viewParent.setEnabled(controlable);

                labelStatus.text = 'ready for scan';
            }
        };

        function loadParent(_global_id) {
            changeMode('loading');

            labelInfo.text = '';
            labelStatus.text = 'interacting with ' + si.config.Medusa.server;

            si.model.medusa.getRecordFromGlobalId({
                global_id : _global_id,
                username : Titanium.App.Properties.getString('username'),
                password : Titanium.App.Properties.getString('password'),
                onsuccess : function(_parent) {
                    parent = _parent;
                    viewParent.update(parent);

                    if (_global_id != Titanium.App.Properties.getString('current_global_id')) {
                        Titanium.App.Properties.setString('current_global_id', _global_id);
                    }
                    if (viewHeaderLeft.children.contains(imageButtonViewScanParent)) {
                        viewHeaderLeft.remove(imageButtonViewScanParent);
                    }
                    if (!viewHeaderLeft.children.contains(viewParent)) {
                        viewHeaderLeft.add(viewParent);
                    }
                    si.sound_newmail.play();
                    changeMode('ready');
                },
                onerror : function(e) {
                    if (!viewHeaderLeft.children.contains(imageButtonViewScanParent)) {
                        viewHeaderLeft.add(imageButtonViewScanParent);
                    }
                    if (viewHeaderLeft.children.contains(viewParent)) {
                        viewHeaderLeft.remove(viewParent);
                    }
                    labelStatus.text = 'ERROR';
                }
            });
        };
        return win;
    };
})();
