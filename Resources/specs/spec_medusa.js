require('/tijasmine/tijasmine').infect(this);
describe('Medusa', function() {
    var USERNAME = 'admin';
    var OK_PASSWORD = 'password';
    var NG_PASSWORD = 'xxxx';
    var CLASSNAME_STONE = 'Stone';
    var CLASSNAME_BOX = 'Box';
    var CLASSNAME_PLACE = 'Place';
    var CLASSNAME_ANALYSIS = 'Analysis';
    var CLASSNAME_BIB = 'Bib';
    var CLASSNAME_ATTACHMENT_FILE = 'AttachmentFile';
    var CLASSNAME_UNKNOWN = 'Unknown';
    var GET_PATH = '/stones/17057.json';
    var PUT_PATH = '/boxes/1632/stones/17057.json';
    var POST_PATH = '/stones.json';
    var params = {};
    params['stone[name]'] = 'new name';
    params['stone[global_id]'] = '0000-0121222';    
    var POST_ARGS = params;
    var GLOBAL_ID = '20150123163615-615374';
    var GLOBAL_URL = 'http://dream.misasa.okayama-u.ac.jp/?query=20150123163615-615374';

    var response;
    var isSuccess;
    beforeEach(function() {
        response = null;
        isSuccess = null;
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
    });

    xit('Get Server Host Name', function() {
        expect(si.model.medusa.host()).toBe('192.168.56.102:3000');
    });


    xdescribe('Get', function() {
        it('With No Auth', function() {
            si.model.medusa.getWithAuth({
                path : GET_PATH,
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : (function(e) {
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it('With Auth', function() {
            si.model.medusa.getWithAuth({
                path : GET_PATH,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBe('');
            });
        });
    });

    xdescribe('Put', function() {
        it('With No Auth', function() {
            si.model.medusa.putWithAuth({
                path : PUT_PATH,
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : (function(e) {
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it('With Auth', function() {
            si.model.medusa.putWithAuth({
                path : PUT_PATH,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
            });
        });
    });

    xdescribe('Post', function() {
        afterEach(function(){
            if (response && response.global_id){
                //Ti.API.info(response.id);
                Ti.API.info(response.global_id);
                si.model.medusa.delete({
                    global_id : response.global_id,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });

            }
        });
        it('With No Auth', function() {
            si.model.medusa.postWithAuth({
                path : POST_PATH,
                username : USERNAME,
                password : NG_PASSWORD,
                args : POST_ARGS,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it('With Auth', function() {
            si.model.medusa.postWithAuth({
                path : POST_PATH,
                username : USERNAME,
                password : OK_PASSWORD,
                args : POST_ARGS,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.name).toBe(params['stone[name]']);
            });
        });
    });

    xdescribe('DELETE', function(){
        it('does something',function(){
            si.model.medusa.createNewStone({
                name : params['stone[name]'],
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    si.model.medusa.delete({
                        global_id : response.global_id,
                        username : USERNAME,
                        password : OK_PASSWORD,
                        onsuccess : (function(e) {
                            response = e;
                            isSuccess = true;
                        }),
                        onerror : (function(e) {
                            isSuccess = false;
                        }),
                    });
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });

            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                //expect(response.name).toBe(params['stone[name]']);
            });




            expect(null).toBe(null);
        });
        afterEach(function(){
            Ti.API.info("after...");
        });
    });

    
    xdescribe('Update attributes', function() {
        var record;
        beforeEach(function(){
            Ti.API.info("creating stone...")
            si.model.medusa.createNewStone({
                name : params['stone[name]'],
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    record = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                Ti.API.info("clearing isSuccess...");                
                isSuccess = null;
            });            

        });
        it('does something', function(){
            Ti.API.info("updating...");
            si.model.medusa.update_attributes(record, {
                //args: {'stone[name]': 'renew name', 'stone[record_property_attributes][global_id]' : '0000-0101002', 'stone[record_property_attributes][user_id]': record.user_id},
                args: {name: 'renew name', global_id : '0000-0101002'},
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(_updated) {
                    Ti.API.info(JSON.stringify(_updated));
                    record = _updated;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(record.name).toBe('renew name');
                expect(record.global_id).toBe('0000-0101002');                
            });

        });
        afterEach(function(){
            Ti.API.info("after...");
            if (record && record.global_id){
                Ti.API.info(record.global_id);
                si.model.medusa.delete({
                    global_id : record.global_id,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });
            }
        });
    });

    describe('Create New Box', function(){
        beforeEach(function(){
            Ti.API.info("before...");
            Ti.API.info(response);
        });

        it('With Auth', function(){
            Ti.API.info("creating...");
            si.model.medusa.createNewBox({
                name : 'new box',
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.name).toBe('new box');
                expect(response.id).not.toBe('');
                expect(response._className).toBe('Box');
                expect(response.user_id).not.toBe('');
                expect(response.global_id).not.toBe('');
            });            
        });

        afterEach(function(){
            Ti.API.info("after...");
            Ti.API.info(response);
            if (response && response.global_id){
                //Ti.API.info(response.id);
                Ti.API.info(response.global_id);
                si.model.medusa.delete({
                    global_id : response.global_id,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });

            }
        });


    });


    describe('Create New Stone', function() {
        afterEach(function(){
            if (response && response.global_id){
                //Ti.API.info(response.id);
                Ti.API.info(response.global_id);
                si.model.medusa.delete({
                    global_id : response.global_id,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });

            }
        });

        it('With No Auth', function() {
            si.model.medusa.createNewStone({
                name : params['stone[name]'],
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it('With Auth', function() {
            si.model.medusa.createNewStone({
                name : params['stone[name]'],
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.name).toBe(params['stone[name]']);
                expect(response.id).not.toBe('');
                expect(response._className).toBe('Stone');
                expect(response.user_id).not.toBe('');
                expect(response.global_id).not.toBe('');
            });
        });

    });
    xdescribe('Get Account Info', function() {
        it('With No Auth', function() {
            si.model.medusa.getAccountInfo({
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : (function(e) {
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it('With Auth', function() {
            si.model.medusa.getAccountInfo({
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
            });
        });

        describe('With wrong server', function(){
            beforeEach(function() {
                Ti.App.Properties.setString('server', 'http://example.com/');
            });
            it('With Auth', function() {
                si.model.medusa.getAccountInfo({
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {
                        isSuccess = true;
                    }),
                    onerror : (function(e) {
                        isSuccess = false;
                    }),
                });
                waitsFor(function() {
                    return isSuccess != null;
                }, '', 30000);
                runs(function() {
                    expect(isSuccess).toBe(false);
                });
            });
        });

        describe('With null server', function(){
            beforeEach(function() {
                Ti.App.Properties.setString('server', 'example.com');
            });
            it('With Auth', function() {
                si.model.medusa.getAccountInfo({
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {
                        isSuccess = true;
                    }),
                    onerror : (function(e) {
                        isSuccess = false;
                    }),
                });
                waitsFor(function() {
                    return isSuccess != null;
                }, '', 30000);
                runs(function() {
                    expect(isSuccess).toBe(false);
                });
            });
        });

    });

    xit('Get Record From Global Id', function() {
        si.model.medusa.getRecordFromGlobalId({
            global_id : GLOBAL_ID,
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : (function(e) {
                response = e;
                isSuccess = true;
            }),
            onerror : (function(e) {
                isSuccess = false;
            }),
        });
        waitsFor(function() {
            return isSuccess != null;
        }, '', 30000);
        runs(function() {
            expect(isSuccess).toBe(true);
            expect(response.global_id).toBe(GLOBAL_ID);
            expect(response.id).toBe(17062);
            expect(response.name).toBe('stone1');
            //expect(response.image_path).toBe('');
        });
    });

    xit('Get Record From Global URL', function() {
        si.model.medusa.getRecordFromGlobalId({
            global_id : GLOBAL_URL,
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : (function(e) {
                response = e;
                isSuccess = true;
            }),
            onerror : (function(e) {
                isSuccess = false;
            }),
        });
        waitsFor(function() {
            return isSuccess != null;
        }, '', 30000);
        runs(function() {
            expect(isSuccess).toBe(true);
            expect(response.global_id).toBe(GLOBAL_ID);
            expect(response.id).toBe(17062);
            expect(response.name).toBe('stone1');
            //expect(response.image_path).toBe('');
        });
    });

    xdescribe('getClassPath', function() {
        var record = {};
        it(CLASSNAME_STONE, function() {
            record._className = CLASSNAME_STONE;
            expect(si.model.medusa.getClassPath(record)).toBe('/stones');
        });

        it(CLASSNAME_BOX, function() {
            record._className = CLASSNAME_BOX;
            expect(si.model.medusa.getClassPath(record)).toBe('/boxes');
        });

        it(CLASSNAME_PLACE, function() {
            record._className = CLASSNAME_PLACE;
            expect(si.model.medusa.getClassPath(record)).toBe('/places');
        });

        it(CLASSNAME_ANALYSIS, function() {
            record._className = CLASSNAME_ANALYSIS;
            expect(si.model.medusa.getClassPath(record)).toBe('/analyses');
        });

        it(CLASSNAME_BIB, function() {
            record._className = CLASSNAME_BIB;
            expect(si.model.medusa.getClassPath(record)).toBe('/bibs');
        });

        it(CLASSNAME_ATTACHMENT_FILE, function() {
            record._className = CLASSNAME_ATTACHMENT_FILE;
            expect(si.model.medusa.getClassPath(record)).toBe('/attachment_files');
        });

        it(CLASSNAME_UNKNOWN, function() {
            record._className = CLASSNAME_UNKNOWN;
            try {
                var path = si.model.medusa.getClassPath(record);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    xdescribe('Create Link Path', function() {
        var parent;
        var child;
        beforeEach(function() {
            parent = {
                '_className' : CLASSNAME_STONE,
                'id' : 1,
            };
            child = {
                '_className' : CLASSNAME_STONE,
                'id' : 2,
            };
        });

        describe(CLASSNAME_STONE, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_STONE;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/daughters/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_BOX, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_BOX;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/stones/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_PLACE, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_PLACE;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/stones/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/places/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_ANALYSIS, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_ANALYSIS;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/stones/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/analyses/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_BIB, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_BIB;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/stones/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/bibs/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_ATTACHMENT_FILE, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_ATTACHMENT_FILE;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/stones/2.json');
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/boxes/2.json');
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/places/2.json');
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/analyses/2.json');
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/bibs/2.json');
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/attachment_files/2.json');
            });

            it(CLASSNAME_UNKNOWN, function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });

        describe(CLASSNAME_UNKNOWN, function() {
            beforeEach(function() {
                parent._className = CLASSNAME_UNKNOWN;
            });
            it(CLASSNAME_STONE, function() {
                child._className = CLASSNAME_STONE;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it(CLASSNAME_BOX, function() {
                child._className = CLASSNAME_BOX;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it(CLASSNAME_PLACE, function() {
                child._className = CLASSNAME_PLACE;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it(CLASSNAME_ANALYSIS, function() {
                child._className = CLASSNAME_ANALYSIS;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it(CLASSNAME_BIB, function() {
                child._className = CLASSNAME_BIB;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it(CLASSNAME_ATTACHMENT_FILE, function() {
                child._className = CLASSNAME_ATTACHMENT_FILE;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });

            it('Unknown Unknown', function() {
                child._className = CLASSNAME_UNKNOWN;
                try {
                    var path = si.model.medusa.getLinkPath(parent, child);
                    expect(false).toBeTruthy();
                } catch(e) {
                    expect(true).toBeTruthy();
                }
            });
        });
    });

    xit('Create Link', function() {
        var parent = {
            '_className' : CLASSNAME_STONE,
            'id' : 17062,
        };
        var child = {
            '_className' : CLASSNAME_STONE,
            'id' : 17053,
        };
        si.model.medusa.createLink(parent, child, {
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : (function(e) {
                isSuccess = true;
            }),
            onerror : (function(e) {
                isSuccess = false;
            }),
        });
        waitsFor(function() {
            return isSuccess != null;
        }, '', 30000);
        runs(function() {
            expect(isSuccess).toBe(true);
        });
    });

    xdescribe('Get Image Upload Path', function() {
        var parent;
        beforeEach(function() {
            parent = {
                '_className' : CLASSNAME_STONE,
                'id' : 1,
            };
        });
        it(CLASSNAME_STONE, function() {
            parent._className = CLASSNAME_STONE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/stones/1/attachment_files.json');
        });

        it(CLASSNAME_BOX, function() {
            parent._className = CLASSNAME_BOX;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/boxes/1/attachment_files.json');
        });

        it(CLASSNAME_PLACE, function() {
            parent._className = CLASSNAME_PLACE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/places/1/attachment_files.json');
        });

        it(CLASSNAME_ANALYSIS, function() {
            parent._className = CLASSNAME_ANALYSIS;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/analyses/1/attachment_files.json');
        });

        it(CLASSNAME_BIB, function() {
            parent._className = CLASSNAME_BIB;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/bibs/1/attachment_files.json');
        });

        it(CLASSNAME_ATTACHMENT_FILE, function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
//            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/attachment_files/upload.json');
            try {
                var path = ssi.model.medusa.getImageUploadPath(parent);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it(CLASSNAME_UNKNOWN, function() {
            parent._className = CLASSNAME_UNKNOWN;
            try {
                var path = ssi.model.medusa.getImageUploadPath(parent);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    xdescribe('Upload Image', function() {
        Ti.API.info("aaa...");
        var record = {
            '_className' : CLASSNAME_STONE,
            'id' : 17062,
        };
        var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png");
        var image = file.read();
        beforeEach(function(){
            Ti.API.info("before...");
        });
        afterEach(function(){
            if (response && response.global_id){
                si.model.medusa.delete({
                    global_id : response.global_id,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {}),
                    onerror : (function(e) {}),
                });

            }
        });

        it('With No Auth', function() {
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                args : {
                    data : image,
                },
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(false);
            });
        });

        it(CLASSNAME_STONE, function() {
            record._className = CLASSNAME_STONE;
            record.id = 17062;
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBeNull;
            });
        });

        it(CLASSNAME_BOX, function() {
            record._className = CLASSNAME_BOX;
            record.id = 1632;
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBeNull;
            });
        });

        it(CLASSNAME_PLACE, function() {
            record._className = CLASSNAME_PLACE;
            record.id = 563;
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBeNull;
            });
        });

        it(CLASSNAME_ANALYSIS, function() {
            record._className = CLASSNAME_ANALYSIS;
            record.id = 3458;
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBeNull;
            });
        });

        it(CLASSNAME_BIB, function() {
            record._className = CLASSNAME_BIB;
            record.id = 661;
            si.model.medusa.uploadImage({
                record : record,
                data : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : (function(e) {
                    response = e;
                    isSuccess = true;
                }),
                onerror : (function(e) {
                    isSuccess = false;
                }),
            });
            waitsFor(function() {
                return isSuccess != null;
            }, '', 30000);
            runs(function() {
                expect(isSuccess).toBe(true);
                expect(response.id).not.toBeNull;
            });
        });

        it(CLASSNAME_ATTACHMENT_FILE, function() {
            record._className = CLASSNAME_ATTACHMENT_FILE;
            try {
                si.model.medusa.uploadImage({
                    record : record,
                    data : image,
                    username : USERNAME,
                    password : OK_PASSWORD,
                    onsuccess : (function(e) {
                        response = e;
                        isSuccess = true;
                    }),
                    onerror : (function(e) {
                        isSuccess = false;
                    }),
                });
                waitsFor(function() {
                    return isSuccess != null;
                }, '', 30000);
                runs(function() {
                    expect(isSuccess).toBe(false);
                });
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

    });
});
