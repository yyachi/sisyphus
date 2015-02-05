require('/tijasmine/tijasmine').infect(this);
describe('Server Setting Window', function() {
    var win;
    var textServer;
    var button;

    beforeEach(function() {
        win = si.ui.createServerSettingWindow();
        textServer = win.input;
        button = win.save_button;
    });

    afterEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        win.close();
    });

    it('title', function() {
        expect(win.title).toBe('Medusa server');
    });

    describe('textServer', function() {
        it('init value', function() {
            expect(textServer.value).toBe(Ti.App.Properties.getString('server'));
        });
    });

    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('save');
        });
        describe('click', function() {
            Ti.App.Properties.setString('server', 'http://localhost');
            it('textServer == nothing', function() {
                textServer.value = '';
                button.fireEvent('click');
            });
            it('textServer != nothing', function() {
                Ti.App.Properties.setString('server', 'http://localhost');
                textServer.value = 'http://localhost:3000';
                button.fireEvent('click');
            });
        });
    });
});
