require('/tijasmine/tijasmine').infect(this);
describe('New Box Window', function() {
    var win;
    var text;
    var button;
    var newbox;
    var isSuccess;

    beforeEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        Ti.App.Properties.setString('username', 'admin');
        Ti.App.Properties.setString('password', 'password');

        win = si.ui.createNewBoxWindow({
            onsuccess: function(_newbox){
                Ti.API.info("new box");
                Ti.API.debug(_newbox.global_id);
                if (_newbox.image){
                    Ti.API.info("image")
                    Ti.API.info(_newbox.image.global_id);
                }
                newbox = _newbox;
                isSuccess = true;
            }
        });
        textName = win.name_field;
        button = win.save_button;
    });

    afterEach(function(){
        Ti.API.info("after 2...");
        if (newbox){
            Ti.API.info(newbox.global_id);
            if (newbox.image){
                Ti.API.info(newbox.image.global_id);
                si.model.medusa.delete({
                    global_id : newbox.image.global_id,
                    username : Ti.App.Properties.getString('username'),
                    password : Ti.App.Properties.getString('password'),
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });                        
            }
            si.model.medusa.delete({
                global_id : newbox.global_id,
                username : Ti.App.Properties.getString('username'),
                password : Ti.App.Properties.getString('password'),                        
                onsuccess : (function(e) {}),
                onerror : (function(e) {}),
            });
        }
        win.close();
    });
    it('title', function() {
        expect(win.title).toBe('New box');
    });
    describe('textName', function() {
        it('init value', function() {
            expect(textName.value).toBe('');
        });
    });
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('OK');
        });
       describe('click', function() {
            var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png");
            var image = file.read();
            beforeEach(function(){
                //image = null
                //var image = file.read();
                //win.set_image(image);
            });
            afterEach(function(){
                Ti.API.info(newbox);
                if (newbox){
                    Ti.API.info(newbox.name);
                }
            });
            it('textName == nothing', function() {
                 textName.value = '';
                 button.fireEvent('click');
            });
            // it('textName != nothing and image', function() {
            //     win.set_image(image);    
            //     textName.value = 'new name';
            //     button.fireEvent('click');
            // });

            // it('textName != nothing', function() {
            //     textName.value = 'new name';
            //     button.fireEvent('click');
            // });

            // waitsFor(function() {
            //     return isSuccess != null;
            // }, '', 60000);
            // runs(function() {
            //     expect(isSuccess).toBe(true);
            //     expect(newbox.name).toBe('new name');  
            // });
        });
    });
});
