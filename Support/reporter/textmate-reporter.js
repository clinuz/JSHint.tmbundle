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

module.exports = {
  reporter: function (results, data, opts) {
    var len = results.length,
        files,
        errors = {},
        style = fs.readFileSync('./views/reporter.css', 'utf8'),
        script = fs.readFileSync('./views/reporter.js', 'utf8'),
        content = fs.readFileSync('./views/report.html', 'utf8'),
        reporterErrorTemplate = fs.readFileSync('./views/reporter-error.html', 'utf8'),
        template,
        htmlContent;

		opts = opts || {};

    // Sort errors by file
    files = sortUnique(results.map(function (item) { return item.file; }));

    files.forEach(function (file) {
      var fileRelative = path.relative(process.env.TM_PROJECT_DIRECTORY, file),
          fileErrors = results.filter(function (item) { return (item.file === file); });

      // fileErrors = fileErrors.filter(function (item) { return (item.error); });
      errors[ fileRelative ] = fileErrors.map(function (item) { var o = item.error; o.file = file; return o; });
    });

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

          fileErrors.forEach(function (item) { ret = ret + options.fn(item, {data: data}); } );
        }
      }
      return ret;
    });

    Handlebars.registerPartial('errorTemplate', reporterErrorTemplate);

    template = Handlebars.compile(content);
    htmlContent = template({errors: errors, numErrors: len,  style: style, script: script});

    process.stdout.write(htmlContent);
	}
};
