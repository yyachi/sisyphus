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
            title : 'Settings',
            icon : '/images/preferences.png',
            window : si.ui.createSettingsWindow()
        });

        tabGroup.addTab(tabMain);
        tabGroup.addTab(tabSettings);
        tabGroup.setActiveTab(tabMain);
        tabGroup.addEventListener('focus', function(e) {
            if (e.tab) {
                tabGroup.currentTab = e.tab;
            }
        });
        return tabGroup;
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

        var view = Titanium.UI.createView({
            width : opts.width,
            height : opts.height
        });
        
        var button = Titanium.UI.createButton({
            title : '',
            backgroundColor : 'white',
            width : '100%',
            height : '100%'
        });
        view.add(button);

        var imageView = Titanium.UI.createImageView({
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
                imageView.image = si.config.Medusa.server + '/' + _record.image_path;
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
Ti.include('/sisyphus/ui/SocketSettingWindow.js');
Ti.include('/sisyphus/ui/ServerSettingWindow.js');

if (Ti.Platform.name == 'iPhone OS') {
    //    Ti.include('/sisyphus/ui/AddChildWindow.js');
}

if (Titanium.Platform.osname == 'android') {
    Ti.include('/sisyphus/ui/android/AddChildWindow.js');
}
