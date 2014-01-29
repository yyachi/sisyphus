(function() {
    si.TiBar = {};

    si.TiBar.scanditsdk = require('com.mirasense.scanditsdk');
    si.TiBar.create_picker = function(opts) {
        if ( typeof opts === 'undefined') {
            opts = {};
        }
        if (!('width' in opts)) {
            opts.width = Ti.Platform.displayCaps.platformWidth;
        }
        if (!('height' in opts)) {
            opts.height = Ti.Platform.displayCaps.platformHeight;
        }

        var picker = si.TiBar.scanditsdk.createView({
            'width' : opts.width,
            'height' : opts.height
        });

        picker.init(si.TiBar.scanditsdk_app_key, 0);
        picker.setQrEnabled(true);

        picker.setCancelCallback(function(e) {
            alert('canceled');

            args.cancel();
        });

        showCancelButton = function(_opts_button) {
            var buttonCancel = Titanium.UI.createButton(si.combine($$.NormalButton, {
                title : 'cancel',
                height : 'auto',
                width : '100%',
                bottom : '0%'
            }));
            buttonCancel.addEventListener('click', function(e) {
                opts.cancel();
            });
            picker.add(buttonCancel);
        };

        var self = picker;
        self.showCancelButton = showCancelButton;

        return self;
    };

    si.TiBar.scan = function(_args) {
        var picker = si.TiBar.create_picker();
        picker.setSuccessCallback(function(e) {
            window.close();
            _args.success(e);
        });
        picker.setCancelCallback(function(e) {
            window.close();
            _args.cancel();
        });

        picker.setQrEnabled(true);
        picker.showToolBar(true);
        picker.startScanning();

        var buttonScanStop = Titanium.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'cancel',
            bottom : '5%'
        }));

        buttonScanStop.addEventListener('click', function(e) {
            window.close();
            _args.cancel();
        });
        picker.add(buttonScanStop);

        var window = Titanium.UI.createWindow({
            title : 'scan barcode',
            backgroundColor : '#fff',
        });
        window.add(picker);
        si.app.tabGroup.currentTab.open(window, {
            animated : false
        });
    };
})();
