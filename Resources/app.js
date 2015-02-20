Ti.include('/sisyphus/sisyphus.js');

//Initialize Sound
si.sound_created = Ti.Media.createSound({
    url : '/etc/2.mp3'
});
si.sound_label = Ti.Media.createSound({
    url : '/etc/5.mp3'
});
si.sound_error = Ti.Media.createSound({
    url : '/etc/7.mp3'
});
si.sound_newmail = Ti.Media.createSound({
//    url : '/etc/newmail.wav'
    url : '/etc/4.mp3'
});
si.sound_mailerror = Ti.Media.createSound({
//    url : '/etc/mailerror.wav'
    url : '/etc/1.mp3'
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

//Set Default Value
if (Ti.App.Properties.getString('current_global_id') == null) {
    Ti.App.Properties.setString('current_global_id', Ti.App.Properties.getString('current_box_global_id'));
}
if (Ti.App.Properties.getString('server') == null) {
    Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
}
if (Ti.App.Properties.getString('username') == null) {
    Ti.App.Properties.setString('username', si.config.Medusa.defaultUsername);
}
if (Ti.App.Properties.getString('password') == null) {
    Ti.App.Properties.setString('password', si.config.Medusa.defaultPassword);
}

if (Ti.App.Properties.getBool('printLabel') == null) {
    Ti.App.Properties.setBool('printLabel', si.config.Medusa.printLabel);
}
if (Ti.App.Properties.getString('printServer') == null) {
    Ti.App.Properties.setString('printServer', si.config.Medusa.defaultPrintServer);
}
if (Ti.App.Properties.getString('printFormatUrl') == null) {
    Ti.App.Properties.setString('printFormatUrl', si.config.Medusa.defaultPrintFormatUrl);
}
if (Ti.App.Properties.getInt('facing') == null) {
    Ti.App.Properties.setInt('facing', si.config.Medusa.facing);
}

si.app.tabGroup = si.ui.createApplicationTabGroup();
si.app.tabGroup.open();

Ti.API.info(Ti.Network.networkTypeName);
if (Ti.Network.networkType == Ti.Network.NETWORK_NONE){
    alert('no network is available.');
}

var cameras = Ti.Media.availableCameras;
// Ti.API.info('cameras');
// Ti.API.info(cameras);
// Ti.API.info(cameras.length);
// Ti.API.info('CAMERA_REAR');
// Ti.API.info(Ti.Media.CAMERA_REAR);
// Ti.API.info(cameras.indexOf(Ti.Media.CAMERA_REAR));
// Ti.API.info('CAMERA_FRONT');
// Ti.API.info(Ti.Media.CAMERA_FRONT);
// Ti.API.info('facing');
// Ti.API.info(Ti.App.Properties.getInt('facing'));
if (cameras.length == 1){
    // Ti.API.info('single camera');
    if(cameras.indexOf(Ti.Media.CAMERA_REAR) == -1){
        // Ti.API.info('front camera');
        Ti.App.Properties.setInt('facing', 1);
    } else {
        // Ti.API.info('rear camera');
        Ti.App.Properties.setInt('facing', 0);
    }
}
// Ti.API.info('facing');
// Ti.API.info(Ti.App.Properties.getInt('facing'));
// if (Ti.App.Properties.getString('username') == null || Ti.App.Properties.getString('username') == '') {
//     setTimeout(function() {
//         var w = si.ui.createLoginWindow();
//         w.open({
//             modal : true
//         });
//     }, 1000);
// }

// Array.prototype.contains = function(value) { 
//     for (var i in this) {
//         if (this.hasOwnProperty(i) && this[i] === value) {
//             return true;
//         }
//     }
//     return false;
// }; 

// Test Code Here!!!
if (si.config.Medusa.test){
        // var w = si.ui.createNewBoxWindow();
        // var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "specs", "files", "homeros.jpeg");
        // // //var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "specs", "files", "homeros-2.jpg");
        // var image = file.read();
        // w.set_image(image);
        // w.open({
        //      modal : true
        // });
    //si.sound_cricket.play();
    require('/tijasmine/tests_runner').run(); 
}
