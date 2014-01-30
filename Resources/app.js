
Ti.include('/sisyphus/sisyphus.js');

si.TiBar.scanditsdk_app_key = 'MtDcnln4EeKdK4dJ4UJ0lnzQS/qlc6/HiAw6LDNYB+4';

if (Ti.App.Properties.getString('current_global_id') == null) {
    Ti.App.Properties.setString('current_global_id', Ti.App.Properties.getString('current_box_global_id'));
}
if (Ti.App.Properties.getString('socket_server') == null) {
    Ti.App.Properties.setString('socket_server', si.model.medusa.host());
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
var testMode = si.config.Medusa.testMode;

if (testMode){
    var tijasmine = require("/tijasmine/tijasmine"),
        reporter = new (require("/tijasmine/tijasmine-console").ConsoleReporter)();
     
    tijasmine.addSpecModules("/specs/spec_medusa");
    tijasmine.addReporter(reporter);
    tijasmine.execute();   
}
