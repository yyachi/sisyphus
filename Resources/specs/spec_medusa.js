require("/tijasmine/tijasmine").infect(this);
describe("Medusa", function() {
    it("Get Medusa Host Name", function() {
        var host = si.model.medusa.host();
        expect(host).toBe('192.168.234.141:3000');
    });

    describe("Get", function() {
        var path = '/main/info.json';
        var username = 'admin';
        it("With No Auth", function() {
            si.model.medusa.getWithAuth({
                path : path,
                username : username,
                password : 'xxxx',
                onsuccess : function(responseText) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it("With Auth", function() {
            si.model.medusa.getWithAuth({
                path : path,
                username : username,
                password : 'adminadmin',
                onsuccess : function(responseText) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });

    describe("Put", function() {
        var path = '/boxes/1/stones/2.json';
        var username = 'admin';
        it("With No Auth", function() {
            si.model.medusa.putWithAuth({
                path : path,
                username : username,
                password : 'xxxx',
                onsuccess : function(responseText) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it("With Auth", function() {
            si.model.medusa.putWithAuth({
                path : path,
                username : username,
                password : 'adminadmin',
                onsuccess : function(responseText) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });

    it("Get Account Info", function() {
        si.model.medusa.getAccountInfo({
            username : 'admin',
            password : 'adminadmin',
            onsuccess : function(e) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    it("Get Recored From Global Id", function() {
        si.model.medusa.getRecordFromGlobalId({
            global_id : '20110416135129-112-853',
            username : 'admin',
            password : 'adminadmin',
            onsuccess : function(e) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    describe("Create Link Path", function() {
        var parent;
        var child;
        beforeEach(function() {
            parent = {
                '_className' : 'Stone',
                'id' : 1,
            };
            child = {
                '_className' : 'Stone',
                'id' : 2,
            };
        });
        it("Stone Stone", function() {
            parent._className = 'Stone';
            child._className = 'Stone';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/daughters/2.json');
        });

        it("Stone Box", function() {
            parent._className = 'Stone';
            child._className = 'Box';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/boxes/2.json');
        });

        it("Stone Attachment_file", function() {
            parent._className = 'Stone';
            child._className = 'Attachment_file';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/stones/1/attachment_files/2.json');
        });

        it("Stone Unknown", function() {
            parent._className = 'Stone';
            child._className = 'Unknown';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
        it("Box Stone", function() {
            parent._className = 'Box';
            child._className = 'Stone';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/stones/2.json');
        });

        it("Box Box", function() {
            parent._className = 'Box';
            child._className = 'Box';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/boxes/2.json');
        });

        it("Box Attachment_file", function() {
            parent._className = 'Box';
            child._className = 'Attachment_file';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/boxes/1/attachment_files/2.json');
        });

        it("Box Unknown", function() {
            parent._className = 'Box';
            child._className = 'Unknown';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it("Attachment_file Stone", function() {
            parent._className = 'Attachment_file';
            child._className = 'Stone';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/stones/2.json');
        });

        it("Attachment_file Box", function() {
            parent._className = 'Attachment_file';
            child._className = 'Box';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/boxes/2.json');
        });

        it("Attachment_file Attachment_file", function() {
            parent._className = 'Attachment_file';
            child._className = 'Attachment_file';
            expect(si.model.medusa.getLinkPath(parent, child)).toBe('/attachment_files/1/attachment_files/2.json');
        });

        it("Attachment_file Unknown", function() {
            parent._className = 'Attachment_file';
            child._className = 'Unknown';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it("Unknown Stone", function() {
            parent._className = 'Unknown';
            child._className = 'Stone';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it("Unknown Box", function() {
            parent._className = 'Unknown';
            child._className = 'Box';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it("Unknown Attachment_file", function() {
            parent._className = 'Unknown';
            child._className = 'Attachment_file';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });

        it("Unknown Unknown", function() {
            parent._className = 'Unknown';
            child._className = 'Unknown';
            try {
                var path = si.model.medusa.getLinkPath(parent, child);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    it("Create Link", function() {
        var parent = {
            '_className' : 'Stone',
            'id' : 1,
        };
        var child = {
            '_className' : 'Stone',
            'id' : 2,
        };
        si.model.medusa.createLink(parent, child, {
            username : 'admin',
            password : 'adminadmin',
            onsuccess : function(responseText) {
                expect(true).toBeTruthy();
            },
            onerror : function(e) {
                expect(false).toBeTruthy();
            },
        });
    });

    describe("Get Image Upload Path", function() {
        var parent;
        beforeEach(function() {
            parent = {
                '_className' : 'Stone',
                'id' : 1,
            };
        });
        it("Stone", function() {
            parent._className = 'Stone';
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/stones/1/attachment_files/upload.json');
        });

        it("Box", function() {
            parent._className = 'Box';
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/boxes/1/attachment_files/upload.json');
        });

        it("Attachment_file", function() {
            parent._className = 'Attachment_file';
            expect(si.model.medusa.getImageUploadPath(parent)).toBe('/attachment_files/upload.json');
        });

        it("Unknown", function() {
            parent._className = 'Unknown';
            try {
                var path = ssi.model.medusa.getImageUploadPath(parent);
                expect(false).toBeTruthy();
            } catch(e) {
                expect(true).toBeTruthy();
            }
        });
    });

    describe("Upload Image", function() {
        var record = {
            '_className' : 'Stone',
            'id' : 1,
        };
        var image = {};
        var username = 'admin';
        it("With No Auth", function() {
            si.model.medusa.uploadImage({
                record : record,
                image : image,
                username : username,
                password : 'xxxxxxx',
                onsuccess : function(responseText) {
                    expect(false).toBeTruthy();
                },
                onerror : function(e) {
                    expect(true).toBeTruthy();
                },
            });
        });

        it("With Auth", function() {
            si.model.medusa.uploadImage({
                record : record,
                image : image,
                username : username,
                password : 'adminadmin',
                onsuccess : function(responseText) {
                    expect(true).toBeTruthy();
                },
                onerror : function(e) {
                    expect(false).toBeTruthy();
                },
            });
        });
    });
});
