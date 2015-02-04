require('/tijasmine/tijasmine').infect(this);
describe('si.ui', function() {
	describe('InputOrScanWindow', function() {
	    beforeEach(function() {
	        win = si.ui.createInputOrScanWindow({
	        	title: 'example',
                save : function(w) {
                	Ti.API.info("saving...");
                	Ti.API.info(w);
                	Ti.API.info(w.text_field.value);
                }
	        });
	        Ti.API.debug(win.text_field);
	        Ti.API.debug(win.save_button);
	    });
	    it('title', function() {
	        expect(win.title).toBe('example');
	    });
        it('text == nothing', function() {
        	win.text_field.value = 'hello'
            //textServer.value = '';
            win.save_button.fireEvent('click');
        });

	    afterEach(function() {
	        win.close();
	    });

	});
});