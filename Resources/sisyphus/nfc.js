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

si.nfc.createScanFelicaWindow = function(_args){
    var win = Ti.UI.createWindow({
        title: 'Scan Felica Card'
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
        si.nfc.onReadFelica({onsuccess: function() {
                if (si.nfc.tagDataValue === null) {
                    alert('Tag is blank.');
                } else {
                    _args.onsuccess();
                }
            }, onerror: function() {
                _args.onerror();
            }
        });
    };
    win.addEventListener('open', function(e) {
        Ti.API.info('window open...');
        si.nfc.setupFelica(success_callback, win);
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

si.nfc.setupFelica = function (success_callback, win) {
    if (success_callback == undefined) { success_callback = function() {}; }

    si.nfc.adapter = si.nfc.module.createNfcAdapter({
        onTechDiscovered: handleDiscovery,
        onTagDiscovered: handleDiscovery
    });

    function handleDiscovery(e) {
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
            { action: si.nfc.module.ACTION_TECH_DISCOVERED, mimeType: '*/*' }
        ],
        techLists: [
            [ "android.nfc.tech.NfcF" ]
        ]
    });
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

si.nfc.onReadFelica = function (_args) {

    var tech = si.nfc.module.createTagTechnologyNfcF({
        tag: si.nfc.scannedTag
    });

    if (!tech.isValid()) {
      alert("Failed to create NfcF tag type.");
      _args.onerror();
    }

    try {
        tech.connect();

        if (!tech.isConnected()) {
            throw new Error("Tag is not connected.");
        } else {

            if (!tech.isValid()) {
                throw new Error("Invalid Felica.");
            }

            var idm = si.nfc.scannedTag.getId();

            var command = si.nfc.readWithoutEncryption(idm);

            var response = tech.transceive(command);

            if (response[10] != 0x00) {
                throw new Error("This card is out of the target.");
            } else {
                si.nfc.tagDataValue = response;
                _args.onsuccess();
            }
        }
    } catch (e) {
        alert("Tag connection error: " + e.message);
        _args.onerror();
    } finally {
        if (tech.isConnected()) {
            tech.close();
        }
    }
}

si.nfc.readWithoutEncryption = function (idm) {
    var r = new RegExp(".{1,"+2+"}","g");
    var idms = idm.match(r);

    var serviceCode = "100B";
    var blockSize = 1;
    var commandSize = 16;

    var commandAry = Ti.createBuffer({length:commandSize});
    commandAry[0] = commandSize;  // データサイズ

    commandAry[1] = 0x06;  // コマンドコード（Read Without Encryption）

    // IDm（8バイトを分割）
    for (var i = 0; i < idms.length; i++) {
        commandAry[i + 2] = parseInt(idms[i], 16);
    }

    commandAry[10] = 1;         // サービス数
    commandAry[11] = 0x0B;      // サービスコード（0x100B）の下位2ビット
    commandAry[12] = 0x10;      // サービスコード（0x100B）の上位2ビット
    commandAry[13] = blockSize; // ブロックサイズ（読み込むブロック数）

    // 職員ID
    commandAry[14] = 0x80;      // ブロックリストエレメント：2バイト（1b） アクセスモード 000b
    commandAry[15] = 0x00;      // ブロック番号（0）

    return commandAry;
}