(function() {
    si.BarcodeReader = {};
    si.BarcodeReader.Camera = {};
    si.BarcodeReader.createScanWindow = function(_args){
        return si.BarcodeReader.Camera.createScanWindow(_args);
    };

    si.BarcodeReader.Camera._createScanWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'Scan barcode with camera',
        });        

        win.buttons = {};
        win.functions = {};
        var viewBase = Ti.UI.createView({
            //backgroundColor : 'red',
            top : 0,
            width : '99%',
            height : '100%',
            layout : 'vertical'
        });

        var viewUpper = Ti.UI.createView({
            //backgroundColor : 'red',
            //top : 0,
            layout : 'vertical',
            //height : '15%'
            height : '55%'
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

        win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { win.functions.clickCloseButton() }
        });


        var picker = si.scanditsdk.createView({
//            top: 100,
//            bottom : 100
        });


        picker.init(Ti.App.Properties.getString('scanditsdk_app_key'), Ti.App.Properties.getInt('facing'));
        picker.setSuccessCallback(function(e) {
            //win.close();
            _args.success(e);

        });
        picker.setCancelCallback(function(e) {
            win.close();
            _args.cancel();
        });

        picker.setQrEnabled(true);
        //picker.setTorchEnabled(true);
        picker.showSearchBar(true);
        picker.setCameraSwitchVisibility(2);
        picker.startScanning();

        var buttonScanStop = Ti.UI.createButton(si.combine($$.ToolBarButton, {
            title : 'Cancel',
            left : 0,
        }));

        win.functions.clickCloseButton = function(){
            win.close();
            _args.cancel();
        };

        buttonScanStop.addEventListener('click', function(e) {
            win.close();
            _args.cancel();
        });

        viewToolLeft.add(win.buttons.Close);
        viewToolBar.add(viewToolLeft);
        viewBase.add(viewToolBar);
        viewBase.add(picker);
        win.add(viewBase);
        return win;
    };



    si.BarcodeReader.Camera.createScanWindow = function(_args){


        var picker;
        // Create a window to add the picker to and display it.
        var win = Titanium.UI.createWindow({
            title:'Scan barcode',
            navBarHidden:true
        });

        var toolBar = Ti.UI.createView({
            bottom : 0,
            layout : 'horizontal',
            height : Ti.UI.SIZE
        });

        var logTable = Ti.UI.createTableView({
            top : 100,
            data: [],
            separatorColor : null
        });

        win.buttons = {};
        win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
            width : 90,
            height : 90,
            imgDimensions : 30,
            onclick : function(e) { closeWindow() }
        });

        toolBar.add(win.buttons.Close);
        // Sets up the scanner and starts it in a new window.
        var openScanner = function() {
            // Instantiate the Scandit SDK Barcode Picker view
            picker = si.scanditsdk.createView({
                width:"100%",
                height:"100%"
            });
            // Initialize the barcode picker, remember to paste your own app key here.
            //picker.init("enter Scandit SDK APP KEY here" - sign up at www.scandit.com, 0);
            picker.init(Ti.App.Properties.getString('scanditsdk_app_key'), Ti.App.Properties.getInt('facing'));

            picker.showSearchBar(true);
            // add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
            picker.showToolBar(true);
            picker.setCameraSwitchVisibility(2);

            // Set callback functions for when scanning succeedes and for when the
            // scanning is canceled.
            picker.setSuccessCallback(function(e) {
                //alert("success (" + e.symbology + "): " + e.barcode);
                //si.app.log.info(e.barcode);
                //picker.stopScanning();
                _args.success(e);
                picker.stopScanning();
                setTimeout(function() {
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
            win.add(logTable);            
            win.add(toolBar);
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
