require('/tijasmine/tijasmine').infect(this);
describe('si.BarcodeReader', function() {

	describe('si.BarcodeReader.createScanWindow', function(){
		var win;
		beforeEach(function(){
//			si.app.log.clear();
			win = si.BarcodeReader.createScanWindow({
	            success : function(_data) {
	                if (_data && _data.barcode) {
	                    addChild(_data.barcode, true);
	                }
	            },
	            cancel : function() {
	            },
	            error : function() {
	            }
            });

		});
	    it('title', function() {
	        expect(win.title).toBe('Scan barcode');
	    });

	});
});