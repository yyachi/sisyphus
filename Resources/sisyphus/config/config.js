(function() {
	si.config = {};
	
	si.config.Medusa = {
		defaultServer: 'http://database.misasa.okayama-u.ac.jp/stone/',
		defaultPrintServer: 'http://localhost:8080/',
		defaultpPrintFormatUrl : 'http://database.misasa.okayama-u.ac.jp/format_archive/dream-label.spfmtz',
		facing: 0, //0 for backward (default) camera, 1 for front camera
		debug: false,
		test: false
	};
	
	si.config.debug = {
        	parent_global_id: '20140327113836-901432',
        	child_global_id: '20140327113913-987802',
        	box_global_id: '20140325163044-289437',
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
