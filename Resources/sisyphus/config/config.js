(function() {
	si.config = {};
	
	si.config.Medusa = {
		defaultServer: 'http://dream.misasa.okayama-u.ac.jp/demo/',
		defaultUsername: 'admin',
		defaultPassword: 'admin',		
		//defaultServer: 'http://192.168.56.102:3000/',
		defaultPrintServer: 'http://localhost:8080/',
		defaultpPrintFormatUrl : 'http://database.misasa.okayama-u.ac.jp/format_archive/dream-label.spfmtz',
		facing: 0, //0 for backward (default) camera, 1 for front camera
		printLabel: 1, //0 for does not print label, 1 for print label		
		debug: false,
		test: true
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
