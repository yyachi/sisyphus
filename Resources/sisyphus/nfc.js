si.nfc = {};
si.nfc.module = require('ti.nfc');
si.nfc.adapter = null;
si.nfc.dispatchFilter = null;
si.nfc.tagDataValue = "";
si.nfc.scannedTag = null;

// Force the default message into the data area
si.nfc.onClear = function (e) {
    si.nfc.tagDataValue = "This application will only push or receive NFC data when it is in the foreground."
}
si.nfc.onClear();

si.nfc.isEnabled = function() {
    si.nfc.adapter = si.nfc.module.createNfcAdapter();
    return si.nfc.adapter.isEnabled();
}

si.nfc.createScanWindow = function(_args){
    var win = Ti.UI.createWindow({
        title: 'Scan NFC Tag'
    });
    
    win.buttons = {};
    win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
        width: 90,
        height: 90,
        imgDimensions: 30,
        onclick: function() { win.close(); }
    });
    win.buttons.Close.top = 0;
    win.buttons.Close.left = 0;
    win.add(win.buttons.Close);
    
    success_callback = function (global_id) {
        if (si.nfc.tagDataValue === null) {
            alert('Tag is blank.');
        } else {
            _args.success(global_id);
        }
    };
    win.addEventListener('open', function(e) {
        Ti.API.info('window open...');
        si.nfc.setupNfc(success_callback, win);
        si.nfc.adapter.enableForegroundDispatch(si.nfc.dispatchFilter);
    });
    
    return win;
}

si.nfc.createWriteWindow = function(value, _args) {
    var win = Ti.UI.createWindow({
       title: 'Write Window' 
    });
    
    win.buttons = {};
    win.buttons.Close = si.ui.createImageButtonView('/images/glyphicons-208-remove-2.png', {
        width: 90,
        height: 90,
        imgDimensions: 30,
        onclick: function() { win.close(); }
    });
    win.buttons.Close.top = 0;
    win.buttons.Close.left = 0;
    win.add(win.buttons.Close);
    
    success_callback = function () {
        si.nfc.onWrite(value, {onsuccess: function() {
            _args.onsuccess();
            win.close();
        }, onerror: function() {
            _args.onerror();
            win.close();
        }});
    };
    win.addEventListener('open', function (e) {
        Ti.API.info('window open...');
        si.nfc.setupNfc(success_callback, win);
        si.nfc.adapter.enableForegroundDispatch(si.nfc.dispatchFilter);
    });
    
    return win;
}

si.nfc.setupNfc = function (success_callback, win) {
    if (success_callback == undefined) { success_callback = function() {}; }
    
    si.nfc.adapter = si.nfc.module.createNfcAdapter({
        onNdefDiscovered: handleDiscovery,// priority: high
        onTechDiscovered: handleDiscovery,// priority: middle
        onTagDiscovered: handleDiscovery  // priority: low
    });
    
    function handleDiscovery(e) {
        si.nfc.tagDataValue = null;
        if (e.messages !== undefined) {
            if (e.messages[0] !== undefined) {
                if (e.messages[0].records[0] !== undefined){
                    si.nfc.tagDataValue = e.messages[0].records[0].text;
                }
            }
        }
        si.nfc.scannedTag = e.tag;
        if (typeof(success_callback) === 'function') {
            success_callback(si.nfc.tagDataValue);
        }
    }
    
    if (!si.nfc.adapter.isEnabled()) {
        alert('NFC is not enabled on this device.');
        return;
    }
    
    var act = win.activity;
    act.addEventListener('newintent', function(e) {
        si.nfc.adapter.onNewIntent(e.intent);
    });
    act.addEventListener('resume', function(e) {
        si.nfc.adapter.enableForegroundDispatch(si.nfc.dispatchFilter);
    });
    act.addEventListener('pause', function(e) {
        si.nfc.adapter.disableForegroundDispatch();
    });
    
    si.nfc.dispatchFilter = si.nfc.module.createNfcForegroundDispatchFilter({
        intentFilters: [
            { action: si.nfc.module.ACTION_NDEF_DISCOVERED, mimeType: '*/*' },
            { action: si.nfc.module.ACTION_TECH_DISCOVERED, mimeType: '*/*' }
        ],
        techLists: [
	        [ "android.nfc.tech.Ndef" ],
	        [ "android.nfc.tech.NfcA" ]
	    ]
    });
    
    // Set the default Ndef message to send when tapped
    // Only works if onPushMessage is null
    var textRecord = si.nfc.module.createNdefRecordText({
        text: "NDEF Push Sample"
    });
    var msg = si.nfc.module.createNdefMessage({
        records: [textRecord]
    });
    si.nfc.adapter.setNdefPushMessage(msg);
}

si.nfc.onWrite = function (global_id, _args) {
    if (global_id == undefined) { global_id = Ti.App.Properties.getString('current_global_id'); }
    
    var tech = si.nfc.module.createTagTechnologyNdef({
        tag: si.nfc.scannedTag
    });
    if (!tech.isValid()) {
      alert("Failed to create Ndef tag type.");
      return;
    }

    try {
        tech.connect();
        if (!tech.isWritable()) {
            alert("Tag is not writable.");
        } else {
            // Create a new message to write to the tag
            var textRecord = si.nfc.module.createNdefRecordText({
                text: global_id
            });
            var msg = si.nfc.module.createNdefMessage({
                records: [textRecord]
            });
            
            // For good measure, confirm that the message is not too big
            var blob = msg.toByte();
            if (blob.length > tech.getMaxSize()) {
                _args.onerror();
            } else {
                tech.writeNdefMessage(msg);
                alert("Tag successfully updated.");
                _args.onsuccess();
                si.nfc.onClear();
            }
        }
    } catch (e) {
        _args.onerror();
    } finally {
        if (tech.isConnected()) {
            tech.close();
        }
    }
}