require('/tijasmine/tijasmine').infect(this);
describe('Print Form Url Setting Window', function() {
    var win;
    var textPrintFormUrl;
    var button;

    beforeEach(function() {
        win = si.ui.createPrintFormatUrlSettingWindow();
        textPrintFormUrl = win.textPrintFormUrl;
        button = win.save_button;
    });

    afterEach(function() {
        Ti.App.Properties.setString('printFormatUrl',si.config.Medusa.defaultpPrintFormatUrl);
        win.close();
    });
    
    it('title', function() {
        expect(win.title).toBe('Print format url');
    });
    
    describe('textPrintFormUrl', function() {
        it('init value', function() {
            expect(textPrintFormUrl.value).toBe(Ti.App.Properties.getString('printFormatUrl'));
        });
    });
    
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('save');
        });
       describe('click', function() {
           Ti.App.Properties.setString('printFormatUrl','xxx');
            it('textPrintFormUrl == nothing', function() {
                textPrintFormUrl.value = '';
                button.fireEvent('click');
            });
            it('textPrintFormUrl != nothing', function() {
                Ti.App.Properties.setString('printFormatUrl','xxx');
                textPrintFormUrl.value = 'file:///aaa';
                button.fireEvent('click');
            });
        });
    });
});
