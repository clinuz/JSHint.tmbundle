"use strict";

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');

function sortUnique(arr) {
  var idx = 0;
  arr.sort(1);
  while (idx < arr.length-1) {
    if (arr[idx] === arr[idx+1]) {
      arr.splice(idx+1, 1);
      continue;
    }
    idx++;
  }
  return arr;
}

function render(errors, numErrors) {
  var style = fs.readFileSync('./views/reporter.css', 'utf8'),
      script = fs.readFileSync('./views/reporter.js', 'utf8'),
      content = fs.readFileSync('./views/report.html', 'utf8'),
      reporterErrorTemplate = fs.readFileSync('./views/reporter-error.html', 'utf8'),
      template,
      htmlContent;

  // Load assets

  Handlebars.registerHelper('fileErrors', function(context, options) {
    var ret = "", file, fileErrors;

    for(file in context) {
      if (context.hasOwnProperty(file)) {
        // We are sure that obj[key] belongs to the object and was not inherited.
        fileErrors = context[ file ];
        ret = ret + "<li class=\"file\">" +
                    "<span class=\"desc\">" + file + "</span>" +
                    "</li>";

        fileErrors.forEach(function (item) { ret = ret + options.fn(item); } );
      }
    }
    return ret;
  });

  Handlebars.registerPartial('errorTemplate', reporterErrorTemplate);

  template = Handlebars.compile(content);
  htmlContent = template({errors: errors, numErrors: numErrors,  style: style, script: script});

  process.stdout.write(htmlContent);
}

module.exports = {

  reporter: function (results, data, opts) {
    var numErrors = results.length,
        files,
        errors = {};

		opts = opts || {};

    // Sort errors by file
    files = sortUnique(results.map(function (item) { return item.file; }));

    files.forEach(function (file) {
      var fileRelative = path.relative(process.env.TM_PROJECT_DIRECTORY, file),
          fileErrors = results.filter(function (item) { return (item.file === file); });

      // fileErrors = fileErrors.filter(function (item) { return (item.error); });
      errors[ fileRelative ] = fileErrors.map(function (item) {
        return {
          file: file,
          severity: 'error',
          line: item.error.line,
          column: item.error.character,
          message: item.error.reason,
          evidence: item.error.evidence,
          source: item.error.raw
        };
      });
    });


    // data.forEach(function (item) {
    //   var fileRelative = path.relative(process.env.TM_PROJECT_DIRECTORY, item.file),
    //       globals = item.implieds,
    //       unuseds = item.unused;
    // 
    //   // Register the file
    // 
    //   if (!errors[fileRelative]) {
    //     errors[fileRelative] = [];
    //   }
    // 
    //   if (globals) {
    //     globals.forEach(function (global) {
    //       errors[fileRelative].push({
    //         file: item.file,
    //         severity: 'warning',
    //         line: global.line,
    //         column: 0,
    //         message: "Implied global '" + global.name + "'",
    //         source: 'jshint.implied-globals'
    //       });
    //     });
    //   }
    //   if (unuseds) {
    //     unuseds.forEach(function (unused) {
    //       errors[fileRelative].push({
    //         file: item.file,
    //         severity: 'warning',
    //         line: unused.line,
    //         column: 0,
    //         message: "Unused variable: '" + unused.name + "'",
    //         source: 'jshint.implied-unuseds'
    //       });
    //     });
    //   }
    // });

    // console.log
    render(errors, numErrors);

	}
};
