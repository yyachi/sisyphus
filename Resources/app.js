Ti.include('/sisyphus/sisyphus.js');

//Set Default Value
if (Ti.App.Properties.getString('current_global_id') == null) {
    Ti.App.Properties.setString('current_global_id', Ti.App.Properties.getString('current_box_global_id'));
}
if (Ti.App.Properties.getString('server') == null) {
    Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
}
if (Ti.App.Properties.getString('printFormatUrl') == null) {
    Ti.App.Properties.setString('printFormatUrl', si.config.Medusa.defaultpPrintFormatUrl);
}

si.app.tabGroup = si.ui.createApplicationTabGroup();
si.app.tabGroup.open();
if (Ti.App.Properties.getString('username') == null || Ti.App.Properties.getString('username') == '') {
    setTimeout(function() {
        var w = si.ui.createLoginWindow();
        w.open({
            modal : true
        });
    }, 1000);
}

si.sound_newmail = Ti.Media.createSound({
    url : '/etc/newmail.wav'
});
si.sound_mailerror = Ti.Media.createSound({
    url : '/etc/mailerror.wav'
});
si.sound_reminder = Ti.Media.createSound({
    url : '/etc/reminder.wav'
});
si.sound_attention = Ti.Media.createSound({
    url : '/etc/attention.wav'
});
si.sound_cricket = Ti.Media.createSound({
    url : '/etc/cricket.wav'
});

Array.prototype.contains = function(value) {
    for (var i in this) {
        if (this.hasOwnProperty(i) && this[i] === value) {
            return true;
        }
    }
    return false;
}; 

// Test Code Here!!!
if (si.config.Medusa.testMode){
    require('/tijasmine/tests_runner').run(); 
}
