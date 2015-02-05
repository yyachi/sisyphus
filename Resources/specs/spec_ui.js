require('/tijasmine/tijasmine').infect(this);
describe('si.ui', function() {
	xdescribe('removeView', function(){
		var from;
		var view;
		var v1;
		var v2;
		beforeEach(function(){
			from = Ti.UI.createView({title: 'from'});
			view = Ti.UI.createView({title: 'target'});
			v1 = Ti.UI.createView({title: 'v1'});
			v2 = Ti.UI.createView({title: 'v2'});			
		});
		afterEach(function(){
			Ti.API.info('after...')
			from = null;
			view = null;
			v1 = null;
			v2 = null;
		});
		it('includes', function(){
			from.add(v1);
			from.add(view);
			from.add(v2);

			var before = from.children.length;			
			//si.ui.removeView(from, view);
			from.remove(view);
			expect(from.children.length).toBe(before - 1);
		});
		it('does not include', function(){
			from.add(v1);
			//from.add(view);
			from.add(v2);
			var before = from.children.length;			
			//si.ui.removeView(from, view);
			from.remove(view);
			expect(from.children.length).toBe(before);
		});

	});
	describe('InputOrScanWindow', function() {
	    beforeEach(function() {
	        win = si.ui.createInputOrScanWindow({
	        	title: 'example',
                save : function(value) {
                	Ti.API.info(value);
                	//Ti.API.info(w.text_field.value);
                }
	        });
	        Ti.API.debug(win.text_field);
	        Ti.API.debug(win.save_button);
	    });
	    it('title', function() {
	        expect(win.title).toBe('example');
	    });
        it('text == nothing', function() {
        	win.set_value('hello');
            //textServer.value = '';
            win.save_button.fireEvent('click');
        });

	    afterEach(function() {
	        win.close();
	    });

	});
});