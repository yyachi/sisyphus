require('/tijasmine/tijasmine').infect(this);
describe('si.app', function() {
	describe('si.app.log', function(){
		beforeEach(function(){
			si.app.log.clear();
		});
		describe('info', function(){
			beforeEach(function(){
				Ti.App.addEventListener('app:logged', function(e){
					Ti.API.info('app:logged fired');
					Ti.API.info(e);
				})
			});
			it('does something', function(){
				si.app.log.info('hello, world info 1');
				si.app.log.info('hello, world info 2');
				expect(si.app.log.list.length).toBe(2);
			});
		});

		describe('error', function(){
			it('does something', function(){
				si.app.log.error('hello, world error 1');
				si.app.log.error('hello, world error 2');
				expect(si.app.log.list.length).toBe(2);
			});
		});

	});
});