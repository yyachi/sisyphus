(function() {
	si.config = {};
	
	si.config.Medusa = {
		defaultServer: 'http://dream.misasa.okayama-u.ac.jp/demo/',
		defaultUsername: 'admin',
		defaultPassword: 'admin',
		//defaultServer: 'http://192.168.56.102:3000/',
		defaultPrintServer: 'http://localhost:8080/',
		defaultPrintFormatUrl : 'http://database.misasa.okayama-u.ac.jp/format_archive/dream-label.spfmtz',
		facing: 0, //0 for backward (default) camera, 1 for front camera
		tagReader: 0,//0 for Rear camera (default), 1 for Front camera, 2 for NFC reader
		tagWriter: 0,//0 for Label printer(default), 1 for NFC writer
                newStone: 0,//0 Input attributes, 1 Show camera
		printLabel: false, //0 for does not print label, 1 for print label		
		debug: false,
		test: true
	};

	si.config.BarcodeReader = {
		scanditsdk_app_key: 'MtDcnln4EeKdK4dJ4UJ0lnzQS/qlc6/HiAw6LDNYB+4'
	};

	si.config.debug = {
        	parent_global_id: '20090305173716694.admin',
        	child_global_id: '20140327113913-987802',
        	box_global_id: '20090305173716694.admin',
	};

	si.config.TiBar = {
		classType: 'ZBarReaderViewController',
    		sourceType: 'Camera',
    		cameraMode: 'Sampling', // Default, Sampling, Sequence            
    		config:{
    			'showsCameraControls':true, // (VC)
    			'showsZBarControls':true,
        		'tracksSymbols':true, // the tracking rectangle that highlights barcodes
        		'enableCache':true,
        		'showsHelpOnFail':true,
        		'takesPicture':false
    		},	
	};
})();
