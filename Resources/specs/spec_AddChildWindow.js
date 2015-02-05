require('/tijasmine/tijasmine').infect(this);
xdescribe('Array', function(){
    var array;
    beforeEach(function(){
        array = ['a', 'b', 'c'];
    });
    it('contains', function(){
        Ti.API.info(array);
        expect(array.contains('a')).toBe(true);
    })
});
describe('Add Child Windows', function() {
    var win;
    beforeEach(function() {
        Ti.API.info('before...')
        //Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        Ti.App.Properties.setString('server', 'http://database.misasa.okayama-u.ac.jp/stone/');
        Ti.App.Properties.setString('username', 'admin');
        Ti.App.Properties.setString('password', 'password');

    });

    var parent_id;
    describe('loadParent', function(){
        beforeEach(function(){
            Ti.API.info('before...2');
            Ti.API.info('creating...');
            win = si.ui.createAddChildWindow();
            parent_id = '20090305173716694.admin';
        });
        it('does something', function(){
            win.loadParent(parent_id);
            Ti.API.info('waits for...');
            Ti.API.info(win.labelStatus.text);
            waitsFor(function() {
                //Ti.API.info(win.labelStatus.text);
                //Ti.API.info(win.labelStatus.text == 'ready for scan');
                return win.labelStatus.text == 'ready for scan';
            }, '', 5000);
            runs(function() {
                Ti.API.info('run...');
                expect(win.labelStatus.text).toBe('ready for scan');  
            });
        });
    });
    
    afterEach(function() {

    });

});