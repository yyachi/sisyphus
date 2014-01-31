(function() {
    si.ui.createAddChildWindow = function() {

        var debug = si.config.Medusa.testMode;
        if (debug) {
            debug_parent_global_id = '20110416135129-112-853';
            debug_child_global_id = '20110416134901-075-241';
        }

        var parent = null;
        var isMultiScan = true;

        var win = Ti.UI.createWindow({
            title : 'Main',
            backgroundColor : 'orange',
            barColor : '#336699',
            orientationModes : [Ti.UI.PORTRAIT],
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
            default_global_id = Ti.App.Properties.getString('current_box_global_id');
            loadParent(default_global_id);
        });
        viewHeaderRight.add(imageButtonViewHome);

        var optionDialogForMenu = Ti.UI.createOptionDialog({
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

        var viewParent = si.ui.createViewParent(null, {
            width : '100%',
            height : '100%',
            imgDimensions : 80,
        });
        viewParent.addEventListener('click', callbackButtonScanParentClick);

        function printLabelAtRemote(_global_id) {

            var host = Ti.App.Properties.getString('socket_server');
            var port = Ti.App.Properties.getString('socket_write_to');

            try {
                socket = Ti.Network.Socket.createTCP({
                    host : host,
                    port : port,
                    connected : function(e) {
                        e.socket.write(Ti.createBuffer({
                            value : _global_id + '\r\n'
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
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');

            labelStatus.text = 'uploading ' + _image.getNativePath() + ' ...';
            changeMode('loading');

            si.model.medusa.uploadImage({
                image : _image,
                record : parent,
                username : username,
                password : password,
                onsuccess : function(_response) {
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
            Ti.Media.openPhotoGallery({
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
            Ti.Media.showCamera({
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

        var scrollView = Ti.UI.createScrollView({
            top : '2%',
            contentHeight : 'auto',
            contentWidth : 'auto',
            backgroundColor : 'white',
            width : '80%',
            left : '10%',
            height : '25%',
            borderWidth : 1,
            borderRadius : 0,
            scrollType : 'vertical'
        });
        viewBody.add(scrollView);

        var labelInfo = Ti.UI.createLabel(si.combine($$.smallText, {
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

        var buttonScanChild = Ti.UI.createButton(si.combine($$.NormalButton, {
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

        win.addEventListener('focus', function(e) {
            refreshLayout();
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

        function refreshLayout() {
            viewBase.setHeight('100%');
            viewBase.setWidth('100%');
            viewBase.setTop(0);
            viewHeader.setHeight('25%');
            viewHeader.setTop(0);
            viewBody.setHeight('75%');
            viewBody.setTop(0);
        };

        function scanAndLoadParent() {
            si.TiBar.scan({
                configure : si.config.TiBar,
                success : function(_data) {
                    if (_data && _data.barcode) {
                        global_id = _data.barcode;
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
                success : function(_data) {
                    if (_data && _data.barcode) {
                        addChild(_data.barcode);
                    }
                },
                cancel : function() {
                },
                error : function() {
                }
            });
        };

        function addChild(_global_id) {
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

                imageButtonViewHome.setEnabled(true);
                imageButtonViewMenu.setEnabled(true);
                viewParent.setEnabled(true);
             } else if (_mode == 'ready') {
                viewParent.setVisible(true);
                buttonScanChild.setEnabled(true);

                imageButtonViewHome.setEnabled(true);
                imageButtonViewMenu.setEnabled(true);
                viewParent.setEnabled(true);

                labelStatus.text = 'ready for scan';
            }
        };

        function loadParent(_global_id) {
            var username = Ti.App.Properties.getString('username');
            var password = Ti.App.Properties.getString('password');
            changeMode('loading');

            labelInfo.text = '';
            labelStatus.text = 'interacting with ' + si.config.Medusa.server;

            si.model.medusa.getRecordFromGlobalId({
                global_id : _global_id,
                username : username,
                password : password,
                onsuccess : function(_response) {
                    parent = _response;
                    viewParent.update(parent);

                    if (_global_id != Ti.App.Properties.getString('current_global_id')) {
                        Ti.App.Properties.setString('current_global_id', _global_id);
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
