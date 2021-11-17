(function() {
    si.ui.createInfoWindow = function(){
        var win = Ti.UI.createWindow({
            title : 'Info',
            //backgroundColor : 'white',
            barColor : '#336699',
            orientationModes : [Ti.UI.PORTRAIT],
            backButtonTitle : 'Back',
            //layout : 'vertical'
        });

        var image_view = Ti.UI.createImageView({
            width : '30%',
            //top: 0,
            //height : '30%',
            //backgroundColor : 'blue',
            //image : '/images/kiriko-0-transparent.png'
            //image : '/images/kiriko-0-inverse.png'
            image : '/images/kiriko-0-transparent-gray-2.png'
        });

        var info_view = Ti.UI.createView({
            width : '70%',
            height : Ti.UI.SIZE,
            layout : 'vertical',
            //top : '10%',
            //backgroundColor : 'blue'
        });

        var image_and_info = Ti.UI.createView({
            top : '10%',
            width : '98%',
            height : Ti.UI.SIZE,
            layout : 'horizontal',
            //backgroundColor : 'yellow'
        });

        var footer = Ti.UI.createView({
            width : '98%',
            height : Ti.UI.SIZE,
            layout : 'vertical',
            bottom : '2%',
            //backgroundColor : 'orange',
            layout : 'vertical'
        });
        var label_copyright = Ti.UI.createLabel(si.combine($$.NormalButton, {
            //font : font,
            height : Ti.UI.SIZE,
            //top : '45%',
            font : {fontWeight : 'bold',fontSize : 36},
            textAlign : 'left',
            text : "\u00A9 2012-2021 Institute for Planetary Materials, Okayama University"
        }));

        var label_version = Ti.UI.createLabel(si.combine($$.NormalButton, {
            //font : font,
            height : Ti.UI.SIZE,
            //top : '45%',
            font : {fontWeight : 'bold',fontSize : 36},
            textAlign : 'left',
            text : 'Sisyphus for Medusa' + ' ' + Ti.App.version 
        }));

        var buttonClearData = Ti.UI.createButton(si.combine($$.NormalButton, {
            title : 'Clear data',
            font : {fontSize:36},
            borderRadius : 10,
            width : '100%',
            height : Ti.UI.SIZE
        }));
        buttonClearData.addEventListener('click', function(e) {
            si.app.clearData();
            //Ti.Platform.openURL('http://dream.misasa.okayama-u.ac.jp/documentation/Archives/client-Android.apk');
        });

        var buttonUpdate = Ti.UI.createButton(si.combine($$.NormalButton, {
            title : 'Update',
            font : {fontSize:36},
            borderRadius : 10,
            width : '100%',
            height : Ti.UI.SIZE
        }));
        buttonUpdate.addEventListener('click', function(e) {
            Ti.Platform.openURL('http://dream.misasa.okayama-u.ac.jp/documentation/Archives/client-Android.apk');
        });

        var buttonHelp = Ti.UI.createButton(si.combine($$.NormalButton, {
            title : 'Help',
            font : {fontSize:36},
            borderRadius : 10,
            width : '100%',
            height : Ti.UI.SIZE
        }));
        buttonHelp.addEventListener('click', function(e) {
            Ti.Platform.openURL('http://dream.misasa.okayama-u.ac.jp/documentation/');
        });
        //var webview = Ti.UI.createWebView({url: 'http://dream.misasa.okayama-u.ac.jp/documentation/'});
        image_and_info.add(image_view);
        image_and_info.add(info_view);        
        info_view.add(label_version);
        info_view.add(label_copyright);        
//        footer.add(buttonClearData);
        footer.add(buttonUpdate);
        footer.add(buttonHelp);
        //info_view.add(label_publisher);
        //win.add(info_view);
        //win.add(image_view);
        win.add(image_and_info);
        win.add(footer);
        return win;
    }
})(); 
