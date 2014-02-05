require('/tijasmine/tijasmine').infect(this);
describe('Print Form Url Setting Window', function() {
    var win;
    var text;
    var button;

    beforeEach(function() {
        win = si.ui.createPrintFormatUrlSetttingWindow();
        text = win.children[0];
        button = win.children[1];
    });

    afterEach(function() {
        Ti.App.Properties.setString('printFormatUrl',si.config.Medusa.defaultpPrintFormatUrl);
        win.close();
    });
    
    it('title', function() {
        expect(win.title).toBe('Print format url');
    });
    
    describe('text', function() {
        it('init value', function() {
            expect(text.value).toBe(Ti.App.Properties.getString('printFormatUrl'));
        });
    });
    
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('save');
        });
       describe('click', function() {
           Ti.App.Properties.setString('printFormatUrl','xxx');
            it('text == nothing', function() {
                text.value = '';
                button.fireEvent('click');
                setTimeout(function() {
                    expect(text.value).not.toBe(Ti.App.Properties.getString('printFormatUrl'));
                }, 10000);
            });
            it('text != nothing', function() {
                Ti.App.Properties.setString('printFormatUrl','xxx');
                text.value = 'aaa';
                button.fireEvent('click');
                setTimeout(function() {
                    expect(text.value).toBe(Ti.App.Properties.getString('printFormatUrl'));
                }, 10000);
            });
        });
    });
});
