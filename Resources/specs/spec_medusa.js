require('/tijasmine/tijasmine').infect(this);
describe('Medusa', function() {
    var USERNAME = 'admin';
    var OK_PASSWORD = 'admin';
    var NG_PASSWORD = 'xxxx';
    var CLASSNAME_STONE = 'Stone';
    var CLASSNAME_BOX = 'Box';
    var CLASSNAME_PLACE = 'Place';
    var CLASSNAME_ANALYSIS = 'Analysis';
    var CLASSNAME_BIB = 'Bib';
    var CLASSNAME_ATTACHMENT_FILE = 'AttachmentFile';
    var CLASSNAME_UNKNOWN = 'Unknown';
    var GET_PATH = '/stones/1.json';
    var PUT_PATH = '/boxes/1/stones/2.json';
    var POST_PATH = '/stones.json';
    var params = {};
    params['stone[name]'] = 'new name';
    var POST_ARGS = params;
    var GLOBAL_ID = '20110416135129-112-853';

    var response;
    var isSuccess;
    beforeEach(function() {
        response = null;
        isSuccess = null;
        Ti.App.Properties.setString('server', si.config.Medusa.defaultServer);
    });

    it('Get Server Host Name', function() {
        expect(si.model.medusa.host()).toBe('192.168.234.141:3000');
    });

    describe('Get', function() {
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

    describe('Put', function() {
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

    describe('Post', function() {
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


    describe('Create New Stone', function() {
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
    describe('Get Account Info', function() {
        it('GWith No Auth', function() {
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
    });

    it('Get Record From Global Id', function() {
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
            expect(response.id).toBe(1);
            expect(response.name).toBe('stone1');
            expect(response.image_path).not.toBe('');
        });
    });

    describe('getClassPath', function() {
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

    describe('Get Image Upload Path', function() {
        var parent;
        beforeEach(function() {
            parent = {
                '_className' : CLASSNAME_STONE,
                'id' : 1,
            };
        });
        it(CLASSNAME_STONE, function() {
            parent._className = CLASSNAME_STONE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/stones/1/attachment_files/upload.json');
        });

        it(CLASSNAME_BOX, function() {
            parent._className = CLASSNAME_BOX;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/boxes/1/attachment_files/upload.json');
        });

        it(CLASSNAME_PLACE, function() {
            parent._className = CLASSNAME_PLACE;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/places/1/attachment_files/upload.json');
        });

        it(CLASSNAME_ANALYSIS, function() {
            parent._className = CLASSNAME_ANALYSIS;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/analyses/1/attachment_files/upload.json');
        });

        it(CLASSNAME_BIB, function() {
            parent._className = CLASSNAME_BIB;
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/bibs/1/attachment_files/upload.json');
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

    describe('Upload Image', function() {
        var record = {
            '_className' : CLASSNAME_STONE,
            'id' : 1,
        };
        var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "KS_nav_ui.png");
        var image = file.read();
        it('With No Auth', function() {
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
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
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
                },
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
                expect(response.id).toBe(1);
            });
        });

        it(CLASSNAME_BOX, function() {
            record._className = CLASSNAME_BOX;
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
                },
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
                expect(response.id).toBe(1);
            });
        });

        it(CLASSNAME_PLACE, function() {
            record._className = CLASSNAME_PLACE;
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
                },
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
                expect(response.id).toBe(1);
            });
        });

        it(CLASSNAME_ANALYSIS, function() {
            record._className = CLASSNAME_ANALYSIS;
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
                },
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
                expect(response.id).toBe(1);
            });
        });

        it(CLASSNAME_BIB, function() {
            record._className = CLASSNAME_BIB;
            si.model.medusa.uploadImage({
                record : record,
                args : {
                    media : image,
                },
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
                expect(response.id).toBe(1);
            });
        });

        it(CLASSNAME_ATTACHMENT_FILE, function() {
            record._className = CLASSNAME_ATTACHMENT_FILE;
            try {
                si.model.medusa.uploadImage({
                    record : record,
                    args : {
                        media : image,
                    },
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
