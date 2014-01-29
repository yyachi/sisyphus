(function() {

 	si.ui.createSettingsWindow = function(_args) {

       var debug = si.config.Medusa.testMode;
        if (debug) {
            debug_box_global_id = '20080616170010.hk';  //ISEI MAIN BUILDING
        }

	    var win = Ti.UI.createWindow({title: 'Settings',backgroundColor:'#ffffff',barColor:'#336699'});

		var data = [
			{title:'----', hasChild:false, target:'Server', header:'Medusa server'},
			{title:'----', hasChild:false, target:'LogIn', header:'account'},
			{title:'----', hasChild:false, target:'Connect', header:'socket server'},
			{title:'----', hasChild:false, target:'ScanToLoad', header:'home'},
		];

		var tableViewOptions = {
				data:data,
				backgroundColor:'transparent',
				rowBackgroundColor:'white'
		};

		var tableView = Titanium.UI.createTableView(tableViewOptions);
		
		tableView.addEventListener('click', function(e){
			var rowNum = e.index;
			switch(e.rowData.target){
				case 'Server':
					var windowServerSetting = si.ui.createServerSettingWindow();
					si.app.tabGroup.currentTab.open(windowServerSetting,{animated:true});
					break;
				case 'LogIn':
					var windowLogin = si.ui.createLoginWindow();
					si.app.tabGroup.currentTab.open(windowLogin,{animated:true});
					break;
				case 'Connect':
					var windowConnect = si.ui.createSocketSettingWindow();
					si.app.tabGroup.currentTab.open(windowConnect,{animated:true});
					break;
				case 'ScanToLoad':
				    if (!debug){
					   scanAndLoadDefaultBox();
					} else {
				      global_id = debug_box_global_id;
                    Titanium.App.Properties.setString('current_box_global_id',global_id);
                    updateHomeRow();
					};
					break;
				default:
					break;
			}
		});

		win.add(tableView);

	    win.addEventListener('focus', function (e) {
	    	tableView.data[0].rows[0].title = serverInfo();
		   	tableView.data[1].rows[0].title = accountInfo();
		   	tableView.data[2].rows[0].title = socketInfo();
		   	updateHomeRow();
		});

		function accountInfo(){
			var username = Titanium.App.Properties.getString('username');
			if (username == null){
				username = 'Click to login.';
			}
			return username;
		};

		function serverInfo(){
			txt = si.config.Medusa.server;
			return txt;
		}

		function socketInfo(){
			txt = 'listen to: ';
			var listen_port = Titanium.App.Properties.getString('socket_listen_to');
			var write_port = Titanium.App.Properties.getString('socket_write_to');
			if (listen_port == null || listen_port == ''){
				txt += '----';
			} else {
				txt += listen_port;
			}
			txt += ', write to: ';
			if (write_port == null || write_port == ''){
				txt += '----';
			} else {
				txt += write_port;
			}
			return txt;
		};

		function updateHomeRow(){
			var row = tableView.data[3].rows[0];
		    global_id = Titanium.App.Properties.getString('current_box_global_id');
		    if (global_id != null){
				si.model.medusa.getRecordFromGlobalId({
					global_id:global_id,
                 username : Titanium.App.Properties.getString('username'),
                 password : Titanium.App.Properties.getString('password'),
					onsuccess:function(record){
						row.title = record.name;
						row.target = 'ScanToLoad';
					},
					onerror:function(e){
					}
				});
			} else {
				var row = tableView.data[3].rows[0];
				row.title = '----';
				row.target = 'ScanToLoad';
			}
		};

		function scanAndLoadDefaultBox(){
			si.TiBar.scan({
	       	configure: si.config.TiBar,
	        	success:function(data){
	            	if(data && data.barcode){
	            		global_id = data.barcode;
	 					Titanium.App.Properties.setString('current_box_global_id',global_id);
	 					updateHomeRow();
	           		}
	        	},
	        	cancel:function(){
	        	},
	        	error:function(){
	       		}
	    	});
	   	};
		return win;
	};
})();
