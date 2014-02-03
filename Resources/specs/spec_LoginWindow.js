require('/tijasmine/tijasmine').infect(this);
describe('Login Window', function() {
    var win;
    var textUsername;
    var textPassword;
    var button;

    beforeEach(function() {
        win = si.ui.createLoginWindow();
        textUsername = win.children[0];
        textPassword = win.children[1];
        button = win.children[2];
    });

    afterEach(function() {
        win.close();
    });
    it('title', function() {
        expect(win.title).toBe('account');
    });
    describe('textUsername', function() {
        it('init value', function() {
            expect(textUsername.value).toBe(Ti.App.Properties.getString('username'));
        });
    });
    describe('textPassword', function() {
        it('init value', function() {
            expect(textPassword.value).toBe(Ti.App.Properties.getString('password'));
        });
        it('passwordMask', function() {
            expect(textPassword.passwordMask).toBe(true);
        });
    });
    describe('button', function() {
        it('title', function() {
            expect(button.title).toBe('save');
        });
        describe('click', function() {
            it('textUsername == nothing', function() {
                textUsername.value = '';
                textPassword.value = 'admin';
                button.fireEvent('click');
            });
            it('textPassword == nothing', function() {
                textUsername.value = 'admin';
                textPassword.value = '';
                button.fireEvent('click');
            });
            it('textUsername == nothing And textPassword == nothing', function() {
                textUsername.value = '';
                textPassword.value = '';
                button.fireEvent('click');
            });
            it('Auth OK', function() {
                textUsername.value = 'admin';
                textPassword.value = 'admin';
                button.fireEvent('click');
            });
            it('Auth NG', function() {
                textUsername.value = 'admin';
                textPassword.value = 'yyy';
                button.fireEvent('click');
            });
        });
    });
});
