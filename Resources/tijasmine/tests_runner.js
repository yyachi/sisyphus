function run() {
    var tijasmine = require('/tijasmine/tijasmine'), 
        reporter = new (require('/tijasmine/tijasmine-console').ConsoleReporter);

    tijasmine.addSpecModules(
       //'/specs/spec_medusa',
       //'/specs/spec_ui'//,
       '/specs/spec_LoginWindow'//, 
       // '/specs/spec_NewStoneWindow', 
       // '/specs/spec_NewBoxWindow', 
       // '/specs/spec_PrintFormatUrlSettingWindow',
       // '/specs/spec_ServerSettingWindow',
       // '/specs/spec_PrintServerSettingWindow',        
       // '/specs/spec_PrintLabel',
       // '/specs/spec_AddChildWindow'
        );
    tijasmine.addReporter(reporter);
    tijasmine.execute();
}

exports.run = run; 