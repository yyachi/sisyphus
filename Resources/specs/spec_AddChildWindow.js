require('/tijasmine/tijasmine').infect(this);
describe('Add Child Windows', function() {

    beforeEach(function() {
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
        Ti.App.Properties.setString('username', 'admin');
        Ti.App.Properties.setString('password', 'password');

        win = si.ui.createAddChildWindow();
    });

    it('does something', function(){
    	expect(null).toBe(null);
    });
    
    afterEach(function() {

    });

});