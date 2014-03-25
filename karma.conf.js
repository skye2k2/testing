module.exports = function(config) {
  config.set({
    files: [
      'test/test.js'
    ],
    basePath: 'src',
    // Load requirejs before chai to keep from getting require errors like: window.chai is undefined, except adding requirejs hangs karma; and where does inject come from?
    frameworks: ['mocha', 'chai', 'sinon'],
    // We need to open the test cases in a new window instead of an iFrame
    // To be able to record the paint times accurately
    client: {
      useIframe: false
    },
    exclude: [],
    reporters: ['progress'],
    port: 9999,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    captureTimeout: 6000,
    singleRun: true,
    // To enable more accurate rendering benchmarking, firefox and chrome have to be started with special flags.
    // Other browsers can be started normally
    browsers: [
      'firefox_perf',
      'chrome_perf'
    ],
    customLaunchers: {
      chrome_perf: {
        base: 'Chrome',
        flags: ['--disable-popup-blocking', '--enable-gpu-benchmarking', '--enable-threaded-compositing']
      },
      firefox_perf: {
        base: 'Firefox',
        prefs: {
          'dom.send_after_paint_to_content': true,
          'dom.disable_open_during_load': false
        }
      }
    }
  });
};
