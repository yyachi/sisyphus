function run() {
    var tijasmine = require('/tijasmine/tijasmine'),
        reporter = new (require('/tijasmine/tijasmine-console').ConsoleReporter);

    tijasmine.addSpecModules(
        '/specs/spec_medusa'
//        ,'/specs/spec_LoginWindow'
    );
    tijasmine.addReporter(reporter);
    tijasmine.execute();
}

exports.run = run;