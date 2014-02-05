require('/tijasmine/tijasmine').infect(this);
describe('Login Window', function() {
    var win;
    var textUsername;
    var textPassword;
    var button;
    var activityIndicator;
    var OK_USERNAME = 'admin';
    var NG_USERNAME = 'xxx';
    var TEST_INIT_USERNAME = 'aaa';
    var OK_PASSWORD = 'admin';
    var NG_PASSWORD = 'yyy';
    var TEST_INIT_PASSWORD = 'aaa';

    beforeEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        win = si.ui.createLoginWindow();
        textUsername = win.children[0];
        textPassword = win.children[1];
        button = win.children[2];
        activityIndicator = win.children[3];
    });

    afterEach(function() {
        Ti.App.Properties.setString('username', OK_USERNAME);
        Ti.App.Properties.setString('password', OK_PASSWORD);
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
            beforeEach(function() {
                Ti.App.Properties.setString('username', TEST_INIT_USERNAME);
                Ti.App.Properties.setString('password', TEST_INIT_PASSWORD);
            });

            it('textUsername == nothing', function() {
                textUsername.value = '';
                textPassword.value = OK_PASSWORD;
                button.fireEvent('click');
            });

            it('textPassword == nothing', function() {
                textUsername.value = OK_USERNAME;
                textPassword.value = '';
                button.fireEvent('click');
            });

            it('textUsername == nothing And textPassword == nothing', function() {
                textUsername.value = '';
                textPassword.value = '';
                button.fireEvent('click');
            });

            it('Auth NG', function() {
                textUsername.value = NG_USERNAME;
                textPassword.value = NG_PASSWORD;
                button.fireEvent('click');
            });

            it('Auth OK', function() {
                textUsername.value = OK_USERNAME;
                textPassword.value = OK_PASSWORD;
                button.fireEvent('click');
            });
        });
    });
});
