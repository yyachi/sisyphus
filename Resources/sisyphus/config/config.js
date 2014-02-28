(function() {
	si.config = {};
	
	si.config.Medusa = {
		defaultServer: 'http://devel.misasa.okayama-u.ac.jp/medusa/',
       //defaultpPrintFormatUrl : 'file:///mnt/sdcard/extStorages/SdCard//okayama.spfmtz',
		defaultpPrintFormatUrl : 'file:///mnt/sdcard/extStorages/SdCard//okayama.spfmtz',
		facing: 1, //0 for backward (default) camera, 1 for front camera
		debug: false,
		test: false
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