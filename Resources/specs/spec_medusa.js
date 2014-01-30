require('/tijasmine/tijasmine').infect(this);
describe('Medusa', function() {
    var USERNAME = 'admin';
    var OK_PASSWORD = 'admin';
    var NG_PASSWORD = 'xxxx';
    var CLASSNAME_STONE = 'Stone';
    var CLASSNAME_BOX = 'Box';
    var CLASSNAME_ATTACHMENT_FILE = 'Attachment_file';
    var CLASSNAME_UNKNOWN = 'Unknown';
    var GET_PATH = '/main/info.json';
    var PUT_PATH = '/boxes/1/stones/2.json';
    var GLOBAL_ID = '20110416135129-112-853';

    it('Get Server Host Name', function() {
        var host = si.model.medusa.host();
        expect(host).toBe('192.168.234.141:3000');
    });

    describe('Get', function() {
        it('With No Auth', function() {
            si.model.medusa.getWithAuth({
                path : GET_PATH,
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : function(response) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it('With Auth', function() {
            si.model.medusa.getWithAuth({
                path : GET_PATH,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : function(response) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });

    describe('Put', function() {
        it('With No Auth', function() {
            si.model.medusa.putWithAuth({
                path : PUT_PATH,
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : function(response) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it('With Auth', function() {
            si.model.medusa.putWithAuth({
                path : PUT_PATH,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : function(response) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });

    it('Get Account Info', function() {
        si.model.medusa.getAccountInfo({
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : function(response) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    it('Get Record From Global Id', function() {
        si.model.medusa.getRecordFromGlobalId({
            global_id : GLOBAL_ID,
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : function(response) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    describe('Create Link Path', function() {
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
        it('Stone Stone', function() {
            parent._className = CLASSNAME_STONE;
            child._className = CLASSNAME_STONE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/daughters/2.json');
        });

        it('Stone Box', function() {
            parent._className = CLASSNAME_STONE;
            child._className = CLASSNAME_BOX;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/boxes/2.json');
        });

        it('Stone Attachment_file', function() {
            parent._className = CLASSNAME_STONE;
            child._className = CLASSNAME_ATTACHMENT_FILE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/attachment_files/2.json');
        });

        it('Stone Unknown', function() {
            parent._className = CLASSNAME_STONE;
            child._className = CLASSNAME_UNKNOWN;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
        it('Box Stone', function() {
            parent._className = CLASSNAME_BOX;
            child._className = CLASSNAME_STONE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/stones/2.json');
        });

        it('Box Box', function() {
            parent._className = CLASSNAME_BOX;
            child._className = CLASSNAME_BOX;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/boxes/2.json');
        });

        it('Box Attachment_file', function() {
            parent._className = CLASSNAME_BOX;
            child._className = CLASSNAME_ATTACHMENT_FILE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/attachment_files/2.json');
        });

        it('Box Unknown', function() {
            parent._className = CLASSNAME_BOX;
            child._className = CLASSNAME_UNKNOWN;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it('Attachment_file Stone', function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
            child._className = CLASSNAME_STONE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/stones/2.json');
        });

        it('Attachment_file Box', function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
            child._className = CLASSNAME_BOX;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/boxes/2.json');
        });

        it('Attachment_file Attachment_file', function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
            child._className = CLASSNAME_ATTACHMENT_FILE;
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/attachment_files/2.json');
        });

        it('Attachment_file Unknown', function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
            child._className = CLASSNAME_UNKNOWN;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it('Unknown Stone', function() {
            parent._className = CLASSNAME_UNKNOWN;
            child._className = CLASSNAME_STONE;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it('Unknown Box', function() {
            parent._className = CLASSNAME_UNKNOWN;
            child._className = CLASSNAME_BOX;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it('Unknown Attachment_file', function() {
            parent._className = CLASSNAME_UNKNOWN;
            child._className = CLASSNAME_ATTACHMENT_FILE;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it('Unknown Unknown', function() {
            parent._className = CLASSNAME_UNKNOWN;
            child._className = CLASSNAME_UNKNOWN;
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    it('Create Link', function() {
        var parent = {
            '_className' : CLASSNAME_STONE,
            'id' : 1,
        };
        var child = {
            '_className' : CLASSNAME_STONE,
            'id' : 2,
        };
        si.model.medusa.createLink(parent, child, {
            username : USERNAME,
            password : OK_PASSWORD,
            onsuccess : function(response) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    describe('Get Image Upload Path', function() {
        var parent;
        beforeEach(function() {
            parent = {
                '_className' : CLASSNAME_STONE,
                'id' : 1,
            };
        });
        it('Stone', function() {
            parent._className = CLASSNAME_STONE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/stones/1/attachment_files/upload.json');
        });

        it('Box', function() {
            parent._className = CLASSNAME_BOX;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/boxes/1/attachment_files/upload.json');
        });

        it('Attachment_file', function() {
            parent._className = CLASSNAME_ATTACHMENT_FILE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/attachment_files/upload.json');
        });

        it('Unknown', function() {
            parent._className = CLASSNAME_UNKNOWN;
            try {
                var path = ssi.model.medusa.getImageUploadPath(parent);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    describe('Upload Image', function() {
        var record = {
            '_className' : CLASSNAME_STONE,
            'id' : 1,
        };
        var image = {};
        it('With No Auth', function() {
            si.model.medusa.uploadImage({
                record : record,
                image : image,
                username : USERNAME,
                password : NG_PASSWORD,
                onsuccess : function(response) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it('With Auth', function() {
            si.model.medusa.uploadImage({
                record : record,
                image : image,
                username : USERNAME,
                password : OK_PASSWORD,
                onsuccess : function(response) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });
});
