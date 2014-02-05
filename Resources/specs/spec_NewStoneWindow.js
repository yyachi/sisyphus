require('/tijasmine/tijasmine').infect(this);
describe('New Stone Window', function() {
    var win;
    var text;
    var button;

    beforeEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        win = si.ui.createNewStoneWindow();
        textName = win.children[0];
        button = win.children[1];
    });

    afterEach(function() {
        win.close();
    });
    it('title', function() {
        expect(win.title).toBe('New Stone');
    });
    describe('textName', function() {
        it('init value', function() {
            expect(textName.value).toBe('');
        });
    });
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('create');
        });
       describe('click', function() {
            it('textName == nothing', function() {
                textName.value = '';
                button.fireEvent('click');
            });
            it('textName != nothing', function() {
                textName.value = 'new name';
                button.fireEvent('click');
            });
        });
    });
});
