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
        // Ti.App.Properties.setString('server', 'http://database.misasa.okayama-u.ac.jp/stone/');
        // Ti.App.Properties.setString('username', 'admin');
        // Ti.App.Properties.setString('password', 'password');
    });

    describe('log', function(){
        beforeEach(function(){
            //si.app.log.info('logging test...');
        });
        it('should show log message', function(){
            for(var count = 0; count < 50 ; count++){
                si.app.log.info('logging test...' + count.toString());
            }      
            //expect(null).
        })
    });

    xdescribe('clickphotoButton', function(){
        beforeEach(function(){
            win = si.ui.createAddChildWindow();
            parent = {global_id:'0000-001'};
            win.set_parent(parent);
        });
        it('should show optionDialog', function(){
            win.clickphotoButton();
        });
        afterEach(function(){
            win = null;
            parent = null;
        });

    });

    xdescribe('photoButtonView', function(){
        beforeEach(function(){
            win = si.ui.createAddChildWindow();
        });
        it('should be able to click', function(){
            win.photoButtonView.button.fireEvent('click');
        });
        afterEach(function(){
            win = null;
        });
    });

    var parent_id;
    xdescribe('loadParent', function(){
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