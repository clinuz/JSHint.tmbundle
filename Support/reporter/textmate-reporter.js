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
		var len = results.length;
		var str = '';

		opts = opts || {};

    // Sort errors by file
    var files = sortUnique(results.map(function (item) { return item.file; }));
    var errors = {};
    files.forEach(function (file) {
      var fileRelative = path.relative(process.env.TM_PROJECT_DIRECTORY, file),
          fileErrors = results.filter(function (item) { return (item.file === file); });

      // fileErrors = fileErrors.filter(function (item) { return (item.error); });
      errors[ fileRelative ] = fileErrors.map(function (item) { var o = item.error; o.file = file; return o; });
    });

    // Load assets

    var style = fs.readFileSync('./views/reporter.css', 'utf8');
    var script = fs.readFileSync('./views/reporter.js', 'utf8');
    var reporterErrorTemplate = fs.readFileSync('./views/reporter-error.html', 'utf8');

    Handlebars.registerHelper('fileErrors', function(context, options) {
      var ret = "", file, errors;

      for(file in context) {
        errors = context[ file ];
        ret = ret + "<li class=\"file\">" +
          // "<a href=\"\">" +
            "<span class=\"desc\">" + file + "</span>" +
            // "<pre></pre>" +
          // "</a>" +
          "</li>";

          errors.forEach(function (item) { ret = ret + options.fn(item, {data: data}); } );
      }

      return ret;
    });

    Handlebars.registerPartial('errorTemplate', reporterErrorTemplate);

    var content = fs.readFileSync('./views/report.html', 'utf8');
    var template = Handlebars.compile(content);

    var html_content = template({errors: errors, lintOK: (len === 0),  style: style, script: script});

    process.stdout.write(html_content);
	}
};
