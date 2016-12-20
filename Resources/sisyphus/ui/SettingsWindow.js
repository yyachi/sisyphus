(function() {

 	si.ui.createSettingsWindow = function(_args) {
	    var win = Ti.UI.createWindow({
	    	title: 'Settings',
	    	//backgroundColor:'#ffffff',
	    	barColor:'#336699'});
	    var font = {fontSize: 20};
		var data = [
//			{title:'----', hasChild:false, target:'Server', header:'Medusa server', font: font},
			{title:'----', hasChild:false, target:'LogIn', header:'Account', font: font},
			{title:'----', hasChild:false, target:'PrintLabel', header:'Label', font: font},			
			//{title:'----', hasChild:false, target:'PrintServer', header:'print server', font: font},
			//{title:'----', hasChild:false, target:'PrintFormatUrl', header:'print format url', font: font},
			{title:'----', hasChild:false, target:'ScanToLoad', header:'Home', font: font},
			{title:'----', hasChild:false, target:'BarcodeReader', header: 'Barcode reader', font: font},
			//{title:'----', hasChild:false, target:'ScanCamera', header: 'Barcode reader', font: font}
			{title: '----', hasChild: false, target: 'TagReader', header: 'Tag reader', font: font},
			{title: '----', hasChild: false, target: 'TagWriter', header: 'Tag writer', font: font}
		];
		var index_medusa_server = findIndex('Server');
		var index_account = findIndex('LogIn');
		var index_print_server = findIndex('PrintServer');
		var index_print_format_url = findIndex('PrintFormatUrl');
		var index_home = findIndex('ScanToLoad');
		var index_print_label = findIndex('PrintLabel');
		var index_scan_camera = findIndex('ScanCamera');
		var index_barcode_reader = findIndex('BarcodeReader');		
		var index_tag_reader = findIndex('TagReader');
		var index_tag_writer = findIndex('TagWriter');

		var tableViewOptions = {
				data:data,
				backgroundColor:'transparent',
				rowBackgroundColor:'white'
		};

        var optionDialogForPrintLabel = Ti.UI.createOptionDialog({
            options : ['enable', 'disable', 'cancel'],
            cancel : 2,
            title : 'Print Label'
        });
        optionDialogForPrintLabel.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
					Ti.App.Properties.setInt('printLabel',1);        
                    break;
                case 1:
					Ti.App.Properties.setInt('printLabel',0);                
                    break;
                default:
                    break;
            };
            updatePrintLabelRow();
			//tableView.data[4].rows[0].title = ScanCameraInfo();
        });

        var optionDialogForBarcodeReader = Ti.UI.createOptionDialog({
            options : ['Rear camera', 'Front camera'],
            //cancel : 2,
            selectedIndex: Ti.App.Properties.getInt('facing'),
            title : 'Barcode reader setting'

        });

        // var optionDialogForScanCamera = Ti.UI.createOptionDialog({
        //     options : ['Rear camera', 'Front camera'],
        //     //cancel : 2,
        //     title : 'Barcode reader setting'
        // });
        optionDialogForBarcodeReader.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
					Ti.App.Properties.setInt('facing',e.index);        
                    break;
                case 1:
					Ti.App.Properties.setInt('facing',e.index);                
                    break;
                default:
                    break;
            };
            //updateScanCameraRow();
			//tableView.data[4].rows[0].title = ScanCameraInfo();
			label_barcode_reader.text = ScanCameraInfo();
        });

        var optionsForTagReader = ['Rear camera', 'Front camera'];
        if (si.nfc.isEnabled()) {
            optionsForTagReader.push('NFC reader');
        }
        var optionDialogForTagReader = Ti.UI.createOptionDialog({
            options : optionsForTagReader,
            selectedIndex: Ti.App.Properties.getInt('tagReader'),
            title : 'Tag reader setting'
        });
        optionDialogForTagReader.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                case 1:
                case 2:
                    Ti.App.Properties.setInt('tagReader', e.index);
                    break;
                default:
                    break;
            };
            label_tag_reader.text = TagReaderInfo();
        });
        
        var optionsForTagWriter = ['Label printer'];
        if (si.nfc.isEnabled()) {
            optionsForTagWriter.push('NFC writer');
        }
        var optionDialogForTagWriter = Ti.UI.createOptionDialog({
            options : optionsForTagWriter,
            selectedIndex: Ti.App.Properties.getInt('tagWriter'),
            title : 'Tag writer setting'
        });
        optionDialogForTagWriter.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                case 1:
                    Ti.App.Properties.setInt('tagWriter', e.index);
                    break;
                default:
                    break;
            };
            label_tag_writer.text = TagWriterInfo();
        });

		var tableView = Ti.UI.createTableView(tableViewOptions);
		tableView.addEventListener('click', function(e){
			var rowNum = e.index;
			switch(e.rowData.target){
				case 'Server':
					var windowServerSetting = si.ui.createServerSettingWindow();
					si.app.tabGroup.activeTab.open(windowServerSetting,{animated:true});
					break;
				case 'LogIn':
					var windowLogin = si.ui.createLoginWindow({
						onsuccess : function(){
                                                    si.ui.myAlert({message: 'Login successful with ' + Ti.App.Properties.getString('loginUsername')});
						}
					});
					si.app.tabGroup.activeTab.open(windowLogin,{animated:true});
					break;
				case 'PrintServer':
					var windowPrintServerSetting = si.ui.createPrintServerSettingWindow();
					si.app.tabGroup.activeTab.open(
						windowPrintServerSetting,
						{animated:true}
					);
					break;
				case 'PrintFormatUrl':
					var windowsPrintFormatUrlSetting = si.ui.createPrintFormatUrlSettingWindow();
					si.app.tabGroup.activeTab.open(windowsPrintFormatUrlSetting,{animated:true});
					break;
				case 'ScanToLoad':
					// var w = si.ui.createInputOrScanWindow({
                    // title: 'Home setting',
                    // value: Ti.App.Properties.getString('current_box_global_id'),
                    // save : function(value) {
                        // ar global_id = value;
                        // Ti.App.Properties.setString('current_box_global_id',global_id);
                        // w.close();
                        // updateHomeRow();
                        // }
                    // });
					// si.app.tabGroup.activeTab.open(
					    // w,{animated:true}
					// );
					scanAndLoadDefaultBox();
					break;
				case 'ScanCamera':
					if (Ti.Media.availableCameras.length > 1){
				    	optionDialogForScanCamera.show();
				    } else {
				    	si.ui.myAlert({message:'single camera'});
				    }
					break;
				case 'BarcodeReader':
					optionDialogForBarcodeReader.show();
					break;	
				case 'TagReader':
					optionDialogForTagReader.show();
					break;
				case 'TagWriter':
					optionDialogForTagWriter.show();
					break;
				case 'PrintLabel':
					var windowLabelPrint = si.ui.createLabelPrintSettingWindow();
					si.app.tabGroup.activeTab.open(windowLabelPrint,{animated:true});
					break;
				    // optionDialogForPrintLabel.show();
					// break;
				default:
					break;
			}
		});
		var view_account = Ti.UI.createView({
			layout : 'vertical'
		});
		var label_server = Ti.UI.createLabel({
			left : 10,
			font : font,
			text : 'URL'
		});
		var label_account = Ti.UI.createLabel({
			left : 10,
			font : font,
			text : 'Username'
		});
		view_account.add(label_server);
		view_account.add(label_account);
		tableView.data[index_account].rows[0].add(view_account);

		var view_label_print_base = Ti.UI.createView({
			layout : 'vertical',
			//backgroundColor: 'yellow'
		});
		var label_print_status = Ti.UI.createLabel({
			left : 10,
			font : font,			
			text : 'Status'
		});
		var label_print_server = Ti.UI.createLabel({
			left : 10,
			font : font,			
			text : 'URL'
		});
		var label_template = Ti.UI.createLabel({
			left : 10,
			font : font,			
			text : 'Template'
		});

		view_label_print_base.add(label_print_status);
		view_label_print_base.add(label_print_server);				
		view_label_print_base.add(label_template);				
		tableView.data[index_print_label].rows[0].add(view_label_print_base);


		var view_barcode_reader_base = Ti.UI.createView({
			layout : 'vertical',
			//backgroundColor: 'yellow'
		});
		var label_barcode_reader = Ti.UI.createLabel({
			left : 10,
			font : font,			
			text : 'BarcodeReader'
		});
		view_barcode_reader_base.add(label_barcode_reader);
		tableView.data[index_barcode_reader].rows[0].add(view_barcode_reader_base);
		//tableView.data[index_account].rows[0].add(label2);		
		win.add(tableView);
		
		var view_tag_reader_base = Ti.UI.createView({
			layout : 'vertical',
			//backgroundColor: 'yellow'
		});
		var label_tag_reader = Ti.UI.createLabel({
			left : 10,
			font : font,
			text : 'TagReader'
		});
		view_tag_reader_base.add(label_tag_reader);
		tableView.data[index_tag_reader].rows[0].add(view_tag_reader_base);
		win.add(tableView);
		
		var view_tag_writer_base = Ti.UI.createView({
			layout : 'vertical',
			//backgroundColor: 'yellow'
		});
		var label_tag_writer = Ti.UI.createLabel({
			left : 10,
			font : font,
			text : 'TagWriter'
		});
		view_tag_writer_base.add(label_tag_writer);
		tableView.data[index_tag_writer].rows[0].add(view_tag_writer_base);
		win.add(tableView);

	    win.addEventListener('focus', function (e) {
	    	label_server.text = serverInfo();
	    	label_account.text = accountInfo();
	    	label_print_status.text = LabelPrintStatus();
	    	label_print_server.text = printServerInfo();
	    	label_template.text = printFormatUrlInfo();
	    	label_barcode_reader.text = ScanCameraInfo();
            label_tag_reader.text = TagReaderInfo();
            label_tag_writer.text = TagWriterInfo();
	    	//tableView.data[index_medusa_server].rows[0].title = serverInfo();
		   	//tableView.data[index_account].rows[0].title = accountInfo();
		   	//tableView.data[index_print_server].rows[0].title = printServerInfo();		   	
		   	//tableView.data[index_print_format_url].rows[0].title = printFormatUrlInfo();
		   	updateHomeRow();
		   	//updateScanCameraRow();
		   	//updatePrintLabelRow();
		});

		function findIndex(target) {
			//Ti.API.info('findIndex: ' + target);
			var i, x;
			for (i in data) {
				x = data[i];
				if (x.target == target) {
					return i;
				}
			}
		}

		function accountInfo(){
			var username = Ti.App.Properties.getString('loginUsername');
			if (username == null || username == ''){
				username = 'Click to login.';
			}
			return username;
		};

		function serverInfo(){
			txt = Ti.App.Properties.getString('server');
			return txt;
		}

		function printServerInfo(){
            var printServer = Ti.App.Properties.getString('printServer');
            return printServer;
		};

		function printFormatUrlInfo(){
            var printFormatUrl = Ti.App.Properties.getString('printFormatUrl');
            return printFormatUrl;
		};

		function ScanCameraInfo(){
			var facing = Ti.App.Properties.getInt('facing');
			if (facing == 1){
				return 'Front camera';
			} else {
				return 'Rear camera';
			}
		}
		
		function TagReaderInfo(){
			var tagReader = Ti.App.Properties.getInt('tagReader');
			if (tagReader == 1){
				return 'Front camera';
			} else if (tagReader == 0) {
				return 'Rear camera';
			} else {
			    return 'NFC reader';
			}
		}
		
		function TagWriterInfo(){
			var tagWriter = Ti.App.Properties.getInt('tagWriter');
			if (tagWriter == 1){
				return 'NFC writer';
			} else {
				return 'Label printer';
			}
		}

		function LabelPrintStatus(){
			if (Ti.App.Properties.getBool('printLabel')){
				return 'ON';
			} else {
				return 'OFF';
			}
		}

		function PrintLabelInfo(){
			if (Ti.App.Properties.getBool('printLabel')){
				return 'enabled';
			} else {
				return 'disabled';
			}
		}

		function updateScanCameraRow(){
			tableView.data[index_scan_camera].rows[0].title = ScanCameraInfo();
		}
		
		function updateTagReaderRow(){
			tableView.data[index_tag_reader].rows[0].title = TagReaderInfo();
		}
		
		function updateTagWriterRow(){
			tableView.data[index_tag_writer].rows[0].title = TagWriterInfo();
		}

		function updatePrintLabelRow(){
			tableView.data[index_print_label].rows[0].title = PrintLabelInfo();
		}

		function updateHomeRow(){
			Ti.API.info('updateHomeRow...');
			var index = index_home;
			var row = tableView.data[index].rows[0];
		    var global_id = Ti.App.Properties.getString('current_box_global_id');
		    if (global_id == '' || global_id !== null){
				si.model.medusa.getRecordFromGlobalId({
					global_id:global_id,
                 	username : Ti.App.Properties.getString('username'),
                 	password : Ti.App.Properties.getString('password'),
					onsuccess:function(response){
						Ti.API.info('success');
						row.title = response.name;
						row.target = 'ScanToLoad';
					},
					onerror:function(e){
						Ti.API.info('error');
						row.title = '';
						row.target = 'ScanToLoad';						
					}
				});
			} else {
				Ti.API.info('global_id is null ');
				var row = tableView.data[index].rows[0];
				row.title = '';
				row.target = 'ScanToLoad';
			}
		};

		function scanAndLoadDefaultBox(){
            if (!si.config.Medusa.debug){
                var _win = null;
                if (Ti.App.Properties.getInt('tagReader') === 2) {
                    _win = si.nfc.createScanWindow({
                        success: function() {
                            if (si.nfc.tagDataValue) {
                                Ti.App.Properties.setString('current_box_global_id', si.nfc.tagDataValue);
                                updateHomeRow();
                            }
                            _win.close();
                        },
                        cancel: function() { _win.close(); },
                        error: function() { _win.close(); }
                    });
                } else {
                    _win = si.BarcodeReader.createScanWindow({
                        success:function(data){
                            if(data && data.barcode){
                                var global_id = data.barcode;
                                Ti.App.Properties.setString('current_box_global_id',global_id);
	                            updateHomeRow();
                            }
                            _win.close();
                        },
                        cancel:function(){ _win.close(); },
                        error:function(){ _win.close(); }
                    });
                }
                si.app.tabGroup.activeTab.open(
                    _win,{animated:true}
                );                                
            } else {
                var global_id = si.config.debug.box_global_id;
                Ti.App.Properties.setString('current_box_global_id',global_id);
                updateHomeRow();
            }
	   	};
		return win;
	};
})();
