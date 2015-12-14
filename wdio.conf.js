var exec = require('child_process').exec;

exports.config = {
    updateJob: false, // will get overwritten
    specs : ['./bdd-tests/*-spec.js'],
    capabilities: {
        browserA: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        browserB: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    },
    onPrepare: function(data) {
        // do something
    },
    before: function() {
       // do something
       GLOBAL.stvEnvironment = process.env.BASE_URL;
    },
    after: function() {
       // do something

    },
    onComplete : function () {
        // kill java after completing
        exec('pkill java');
    }
}
