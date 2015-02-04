require('/tijasmine/tijasmine').infect(this);
describe('PrintServer Setting Window', function() {
    var win;
    var header;
    var header_left;
    var header_right;
    var textServer;
    var scan;
    var button;

    beforeEach(function() {
        win = si.ui.createPrintServerSetttingWindow();
        textServer = win.text_field;
        button = win.save_button;
    });

    afterEach(function() {
        Ti.App.Properties.setString('printServer', si.config.Medusa.defaultPrintServer);
        win.close();
    });

    it('title', function() {
        expect(win.title).toBe('print server');
    });

    describe('textServer', function() {
        it('init value', function() {
            expect(textServer.value).toBe(Ti.App.Properties.getString('printServer'));
        });
    });

    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('save');
        });
        describe('click', function() {
            Ti.App.Properties.setString('printServer', 'http://localhost');
            it('textServer == nothing', function() {
                textServer.value = '';
                button.fireEvent('click');
            });
            it('textServer != nothing', function() {
                Ti.App.Properties.setString('printServer', 'http://localhost');
                textServer.value = 'http://localhost:8000';
                button.fireEvent('click');
            });
        });
    });
});
