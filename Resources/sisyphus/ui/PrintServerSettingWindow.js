(function() {
    si.ui.createPrintServerSettingWindow = function(_args) {
        var win = si.ui.createInputOrScanWindow({
            title: 'print server',
            value: Ti.App.Properties.getString('printServer'),
            save : function(value) {
                Ti.App.Properties.setString('printServer',value);
                win.close();
            }
        });
        return win;
    };
})(); 