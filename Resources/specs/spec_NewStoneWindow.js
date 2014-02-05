require('/tijasmine/tijasmine').infect(this);
describe('New Stone Window', function() {
    var win;
    var text;
    var button;

    beforeEach(function() {
        win = si.ui.createNewStoneWindow();
        text = win.children[0];
        button = win.children[1];
    });

    afterEach(function() {
        win.close();
    });
    it('title', function() {
        expect(win.title).toBe('New Stone');
    });
    describe('text', function() {
        it('init value', function() {
            expect(text.value).toBe('');
        });
    });
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('create');
        });
       describe('click', function() {
            it('text == nothing', function() {
                text.value = '';
                button.fireEvent('click');
                setTimeout(function() {
                }, 10000);
            });
            it('text != nothing', function() {
                text.value = 'new name';
                button.fireEvent('click');
                setTimeout(function() {
                }, 10000);
            });
        });
    });
});
