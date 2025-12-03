module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html'
    ],
    publishQuiet: true,
    timeout: 30000
  }
};

