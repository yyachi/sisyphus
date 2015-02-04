require('/tijasmine/tijasmine').infect(this);
describe('Print Label', function() {


    describe('printServerURL', function(){
		describe('with ipaddr:port', function(){
			beforeEach(function(){
    			Ti.API.info("before...")
				Ti.App.Properties.setString('printServer', '172.24.1.224:8889');			
				Ti.API.info(Ti.App.Properties.getString('printServer'));
			});
		    it('printServerURL with idaddr:port', function() {
		        expect(si.ui.android.printServerURL()).toBe('http://172.24.1.224:8889/');
		    });
		    afterEach(function() {
		    	Ti.API.info("after...")
		        Ti.App.Properties.setString('printServer', si.config.Medusa.defaultPrintServer);
		    });		

		});
		describe('with http://ipaddr:port', function(){
			beforeEach(function(){
    			Ti.API.info("before...")
				Ti.App.Properties.setString('printServer', 'http://172.24.1.224:8889');			
				Ti.API.info(Ti.App.Properties.getString('printServer'));
			});
		    it('printServerURL with idaddr:port', function() {
		        expect(si.ui.android.printServerURL()).toBe('http://172.24.1.224:8889/');
		    });
		    afterEach(function() {
		    	Ti.API.info("after...")
		        Ti.App.Properties.setString('printServer', si.config.Medusa.defaultPrintServer);
		    });		

		});

		describe('with http://ipaddr:port/', function(){
			beforeEach(function(){
    			Ti.API.info("before...")				
				Ti.App.Properties.setString('printServer', 'http://172.24.1.224:8889/');			
				Ti.API.info(Ti.App.Properties.getString('printServer'));
			});
		    it('printServerURL with idaddr:port', function() {
		        expect(si.ui.android.printServerURL()).toBe('http://172.24.1.224:8889/');
		    });
		    afterEach(function() {
		    	Ti.API.info("after...")
		        Ti.App.Properties.setString('printServer', si.config.Medusa.defaultPrintServer);
		    });		

		});

	});

    describe('Print', function() {
    	beforeEach(function(){
    		this._originalMethod = si.ui.android.printServerURL;
    		spyOn(si.ui.android, 'printServerURL').andReturn('http://localhost:8000/');
    	});
    	it('call si.ui.printServerURL', function(){
        	si.ui.android.printLabel('aaa','bbb');
	        expect(si.ui.android.printServerURL).toHaveBeenCalled();
	    });
	    afterEach(function(){
	    	si.ui.android.printServerURL = this._originalMethod;
	    });
    });
});