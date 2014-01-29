(function() {
	si.config = {};
	
	si.config.Medusa = {
		server: 'http://192.168.234.141:3000',
		testMode : true
//		socket_listen_to: '7000',
//		socket_write_to: '7000',		
//		current_box_global_id: '20090305054821900.admin',
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