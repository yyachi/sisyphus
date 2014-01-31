(function() {
    si.ui.createNewStoneWindow = function(_args) {
        var win = Ti.UI.createWindow({
            title : 'New Stone',
            backgroundColor : 'white'
        });

        var text = Ti.UI.createTextField(si.combine($$.TextField, {
            value : '',
            top : '5%',
            keyboardType :  Ti.UI.KEYBOARD_DEFAULT,
            hintText : 'Stone Name'
        }));

        var button = Ti.UI.createButton(si.combine($$.RightBottomButton, {
            title : 'create',
        }));

        button.addEventListener('click', function() {
            if (text.value == '') {
                alert('Please input name of new stone');
                return;
            }
            si.model.medusa.postWithAuth({
                args : {name : text.value},
                path : '/stones.json',
                username : Ti.App.Properties.getString('username'),
                password : Ti.App.Properties.getString('password'),
                onsuccess : function(_response) {
                    win.close();
                },
                onerror : function(e) {
                    alert('error');
                }
            });           
        });

        win.add(text);
        win.add(button);
        return win;
    };
})(); 