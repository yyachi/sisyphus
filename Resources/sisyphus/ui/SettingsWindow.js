(function() {

 	si.ui.createSettingsWindow = function(_args) {

       var debug = false;
        if (debug) {
            debug_box_global_id = '20080616170010.hk';  //ISEI MAIN BUILDING
        }

	    var win = Ti.UI.createWindow({title: 'Settings',backgroundColor:'#ffffff',barColor:'#336699'});

		var data = [
			{title:'----', hasChild:false, target:'Server', header:'Medusa server'},
			{title:'----', hasChild:false, target:'LogIn', header:'account'},
			{title:'----', hasChild:false, target:'PrintFormatUrl', header:'print format url'},
			{title:'----', hasChild:false, target:'ScanToLoad', header:'home'},
		];

		var tableViewOptions = {
				data:data,
				backgroundColor:'transparent',
				rowBackgroundColor:'white'
		};

		var tableView = Ti.UI.createTableView(tableViewOptions);
		tableView.addEventListener('click', function(e){
			var rowNum = e.index;
			switch(e.rowData.target){
				case 'Server':
					var windowServerSetting = si.ui.createServerSettingWindow();
					si.app.tabGroup.activeTab.open(windowServerSetting,{animated:true});
					break;
				case 'LogIn':
					var windowLogin = si.ui.createLoginWindow();
					si.app.tabGroup.activeTab.open(windowLogin,{animated:true});
					break;
				case 'PrintFormatUrl':
					var windowsPrintFormatUrlSetting = si.ui.createPrintFormatUrlSetttingWindow();
					si.app.tabGroup.activeTab.open(windowsPrintFormatUrlSetting,{animated:true});
					break;
				case 'ScanToLoad':
					scanAndLoadDefaultBox();
					break;
				default:
					break;
			}
		});

		win.add(tableView);

	    win.addEventListener('focus', function (e) {
	    	tableView.data[0].rows[0].title = serverInfo();
		   	tableView.data[1].rows[0].title = accountInfo();
		   	tableView.data[2].rows[0].title = printFormatUrlInfo();
		   	updateHomeRow();
		});

		function accountInfo(){
			var username = Ti.App.Properties.getString('username');
			if (username == null){
				username = 'Click to login.';
			}
			return username;
		};

		function serverInfo(){
			txt = Ti.App.Properties.getString('server');
			return txt;
		}

		function printFormatUrlInfo(){
            var printFormatUrl = Ti.App.Properties.getString('printFormatUrl');
            return printFormatUrl;
		};

		function updateHomeRow(){
			var row = tableView.data[3].rows[0];
		    var global_id = Ti.App.Properties.getString('current_box_global_id');
		    if (global_id != null){
				si.model.medusa.getRecordFromGlobalId({
					global_id:global_id,
                 username : Ti.App.Properties.getString('username'),
                 password : Ti.App.Properties.getString('password'),
					onsuccess:function(response){
						row.title = response.name;
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
            if (!debug){
                si.TiBar.scan({
                configure: si.config.TiBar,
                	success:function(data){
                    if(data && data.barcode){
                        var global_id = data.barcode;
                        Ti.App.Properties.setString('current_box_global_id',global_id);
                        updateHomeRow();
                        }
                	},
                	cancel:function(){
                	},
                	error:function(){
                	}
                });
            } else {
                var global_id = debug_box_global_id;
                Ti.App.Properties.setString('current_box_global_id',global_id);
                updateHomeRow();
            }
	   	};
		return win;
	};
})();
