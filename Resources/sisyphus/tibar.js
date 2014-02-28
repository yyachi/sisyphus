(function() {
    si.TiBar = {};
    var SCANDITSDK_APP_KEY = 'MtDcnln4EeKdK4dJ4UJ0lnzQS/qlc6/HiAw6LDNYB+4';
    
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

        picker.init(SCANDITSDK_APP_KEY, si.config.Medusa.facing);
        picker.setQrEnabled(true);

        picker.setCancelCallback(function(e) {
            alert('canceled');

            args.cancel();
        });

        showCancelButton = function(_opts_button) {
            var buttonCancel = Ti.UI.createButton(si.combine($$.NormalButton, {
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

        var buttonScanStop = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'cancel',
            bottom : '5%'
        }));

        buttonScanStop.addEventListener('click', function(e) {
            window.close();
            _args.cancel();
        });
        picker.add(buttonScanStop);

        var window = Ti.UI.createWindow({
            title : 'scan barcode',
            backgroundColor : '#fff',
        });
        window.add(picker);
        si.app.tabGroup.activeTab.open(window, {
            animated : false
        });
    };
})();
