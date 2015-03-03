(function() {
    si.BarcodeReader = {};
    si.BarcodeReader.Camera = {};
    si.BarcodeReader.createScanWindow = function(_args){
        return si.BarcodeReader.Camera.createScanWindow(_args);
    };

    si.BarcodeReader.Camera.createScanWindow = function(_args){


        var picker;
        // Create a window to add the picker to and display it.
        var win = Titanium.UI.createWindow({
            title:'Scan barcode',
            navBarHidden:true
        });

        var toolBar = Ti.UI.createView({
            top : 0,
            //layout : 'horizontal',
            height : Ti.UI.SIZE
        });

        var logTable = Ti.UI.createTableView({
            top : "20%",
            data: [],
            //borderColor : 'blue',
            separatorColor : null
        });

        var searchBox = Ti.UI.createTextField({
            left : 90,
            right : 90,
            value : '',
            keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
            //width : '50%',
            hintText : 'or input barcode'
        });

        var HotSpotHeight = 0.25;
        win.buttons = {};
        win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { closeWindow() }
        });
        win.buttons.Close.left = 0;
        win.buttons.Search = si.ui.createImageButtonView('/images/glyphicons-28-search.png', {
            right : 0,
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { _args.success({barcode: searchBox.value}) }
        });
        win.buttons.Search.right = 0;
        toolBar.add(win.buttons.Close);
        toolBar.add(searchBox);
        toolBar.add(win.buttons.Search);
        //win.add(toolBar);
        //win.add(base);

        // Sets up the scanner and starts it in a new window.
        var openScanner = function() {
            // Instantiate the Scandit SDK Barcode Picker view
            picker = si.scanditsdk.createView({
                height : "100%",
                width:"100%",
                //zIndex: 1,
                //height:"100%"
            });
            // Initialize the barcode picker, remember to paste your own app key here.
            //picker.init("enter Scandit SDK APP KEY here" - sign up at www.scandit.com, 0);
            picker.init(Ti.App.Properties.getString('scanditsdk_app_key'), Ti.App.Properties.getInt('facing'));

            //picker.showSearchBar(true);
            // add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
            //picker.showToolBar(true);
            picker.setCameraSwitchVisibility(2);
            picker.setCameraSwitchButtonRelativePositionAndSize(0.05, 0.14, 67, 33);
            picker.setTorchButtonRelativePositionAndSize(0.05, 0.14, 67, 33);
            picker.restrictActiveScanningArea(true);
            picker.setScanningHotSpotHeight(HotSpotHeight);
            //picker.setScanningHotSpotHeight();
            // Set callback functions for when scanning succeedes and for when the
            // scanning is canceled.
            picker.setSuccessCallback(function(e) {
                //alert("success (" + e.symbology + "): " + e.barcode);
                //si.app.log.info(e.barcode);
                //picker.stopScanning();
                _args.success(e);
                //si.app.log.info('sleeping...');
                picker.stopScanning();
                //picker.setScanningHotSpotHeight(0.0);
                setTimeout(function() {
                    //si.app.log.info('wake up');
                    //picker.setScanningHotSpotHeight(HotSpotHeight);
                    picker.startScanning();
                    //addChild(si.config.debug.child_global_id, false);
                }, 500);

            });
            picker.setCancelCallback(function(e) {
                closeScanner();
                _args.cancel();
            });
        }
        // Stops the scanner, removes it from the window and closes the latter.
        var closeScanner = function() {
            if (picker != null) {
                picker.stopScanning();
                win.remove(picker);
            }
            //win.close();
        }

        var closeWindow = function() {
            //closeScanner();
            win.close();
        }

        win.addEventListener('open', function(e) {
            Ti.API.info('window open...')
            openScanner();
            win.add(picker);
            win.add(toolBar);
            win.add(logTable);            
            // Adjust to the current orientation.
            // since window.orientation returns 'undefined' on ios devices
            // we are using Ti.UI.orientation (which is deprecated and no longer
            // working on Android devices.)
            if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
                picker.setOrientation(Ti.UI.orientation);
            }
            else {
                picker.setOrientation(win.orientation);
            }
            picker.setSize(Ti.Platform.displayCaps.platformWidth,
            Ti.Platform.displayCaps.platformHeight);
            picker.startScanning(); // startScanning() has to be called after the window is opened.
        });
        win.addEventListener('close', function(e) {
            Ti.API.info('window close...');
            closeScanner();
        });
        //window.open();
        Ti.App.addEventListener('app:logged', function(e){
            // Ti.API.info('app:logged fired');
            // Ti.API.info(e);
            var _row = Ti.UI.createTableViewRow({
                height : Ti.UI.SIZE
            });
            var _label = Ti.UI.createLabel(si.combine($$.logText, {
                text : e.message,
                bottom : 0,
                width : '100%',
                height : 'auto',
                textAlign : 'left'
            }));
            if (e.level === 'error'){
                _label.color = 'red';
            }
            _row.add(_label);
            logTable.insertRowBefore(0,_row);
            logTable.scrollToIndex(0);
        });
        // Changes the picker dimensions and the video feed orientation when the
        // orientation of the device changes.
        Ti.Gesture.addEventListener('orientationchange', function(e) {
            win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT,Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
            if (picker != null) {
                picker.setOrientation(e.orientation);
                picker.setSize(Ti.Platform.displayCaps.platformWidth,
                Ti.Platform.displayCaps.platformHeight);
                // You can also adjust the interface here if landscape should look
                // different than portrait.
            }
        });
        return win;
        // // create start scanner button
        // var button = Titanium.UI.createButton({
        //     "width":200,
        //     "height": 80,
        //     "title": "start scanner"
        // });
        // button.addEventListener('click', function() {
        //     openScanner();
        // });
        // var rootWindow = Titanium.UI.createWindow({
        //     backgroundColor:'#000'
        // });
        // rootWindow.add(button);
        // //rootWindow.open();
        // return rootWindow;
    };
})();
