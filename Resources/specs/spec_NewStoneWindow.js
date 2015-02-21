require('/tijasmine/tijasmine').infect(this);
describe('New Stone Window', function() {
    var win;
    var text;
    var button;
    var newstone;
    var isSuccess;

    beforeEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        Ti.App.Properties.setString('username', 'admin');
        Ti.App.Properties.setString('password', 'password');

        win = si.ui.createNewStoneWindow({
            onsuccess: function(_newstone){
                Ti.API.info("new stone");
                Ti.API.debug(_newstone.global_id);
                if (_newstone.image){
                    Ti.API.info("image")
                    Ti.API.info(_newstone.image.global_id);
                }
                newstone = _newstone;
                isSuccess = true;
            }
        });
        textName = win.name_field;
        button = win.save_button;
    });

    afterEach(function(){
        Ti.API.info("after 2...");
        if (newstone){
            Ti.API.info(newstone.global_id);
            if (newstone.image){
                Ti.API.info(newstone.image.global_id);
                si.model.medusa.delete({
                    global_id : newstone.image.global_id,
                    username : Ti.App.Properties.getString('username'),
                    password : Ti.App.Properties.getString('password'),
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });                        
            }
            si.model.medusa.delete({
                global_id : newstone.global_id,
                username : Ti.App.Properties.getString('username'),
                password : Ti.App.Properties.getString('password'),                        
                onsuccess : (function(e) {}),
                onerror : (function(e) {}),
            });
        }
        win.close();
    });
    it('title', function() {
        expect(win.title).toBe('New stone');
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
                Ti.API.info(newstone);
                if (newstone){
                    Ti.API.info(newstone.name);
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
            // it('textName != nothing and global_id', function() {
            //     win.set_global_id('0101001-234101');    
            //     textName.value = 'new name';
            //     button.fireEvent('click');
            // });

            // waitsFor(function() {
            //     return isSuccess != null;
            // }, '', 6000);
            // runs(function() {
            //     expect(isSuccess).toBe(true);
            //     expect(newstone.name).toBe('new name');  
            // });
        });
    });
});
