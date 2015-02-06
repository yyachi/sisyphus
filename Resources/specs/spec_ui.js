require('/tijasmine/tijasmine').infect(this);
describe('si.ui', function() {
	describe('createViewParent', function(){
		var view;
		var record;
		beforeEach(function(){
			view = si.ui.createViewParent(null,{});
		});
		afterEach(function(){
	        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
		});

		describe('update with relative_url', function(){
			beforeEach(function(){

				Ti.App.Properties.setString('server', 'http://database.misasa.okayama-u.ac.jp/stone');
				record = {image_path: '/stone/system/attachment_files/0004/4131/IMG_2537_thumb.JPG?1422933650'}
				view = si.ui.createViewParent(null,{});
			});

			it('set image', function(){
				view.update(record);
				expect(view.imageView.image).toBe('http://database.misasa.okayama-u.ac.jp/stone/system/attachment_files/0004/4131/IMG_2537_thumb.JPG?1422933650');
			});
		});

		describe('update with url', function(){
			beforeEach(function(){
				Ti.App.Properties.setString('server', 'http://localhost:3000/');
				record = {image_path: "/system/attachment_files/0004/3514/tixhr954583099_thumb.png?1423048668"};
				view = si.ui.createViewParent(null,{});
			});

			it('set image', function(){
				view.update(record);
				expect(view.imageView.image).toBe('http://localhost:3000/system/attachment_files/0004/3514/tixhr954583099_thumb.png?1423048668');
			});
		});

	});

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
	xdescribe('InputOrScanWindow', function() {
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