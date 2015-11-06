var fs = require('fs'),
    path = require('path');

var FileManager = function(options) {
  this.options = options;
};

FileManager.prototype = {
  getPath: function(resolvedFilename) {
    // TODO: What should this really be? Since there are no nested imports,
    // seems like it doesn't really matter?
    path.dirname(resolvedFilename);
  },

  loadFile: function(filename, currentDirectory, options, environment, cb) {
    var contents = require(path.join(currentDirectory, filename)),
        i,
        key,
        keys = Object.keys(contents).filter(function(k) {
          return contents.hasOwnProperty(k);
        }),
        len,
        type;

    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      type = typeof contents[key];

      if (type !== 'string' && type !== 'number') {
        cb(new Error('Unsupported JS type ' + type + ' for variable ' + key));
        return;
      }
    }

    cb(null, {
      contents: keys.map(function(k) {
        return '@' + k + ': ' + contents[k] + ';';
      }).join('\n'),
      filename: filename
    });
  },

  supports: function(filename, currentDirectory, options, environment) {
    var stat;

    if (!filename.match(/\.js(on)?$/)) {
      return false;
    }

    try {
      stat = fs.statSync(path.join(currentDirectory, filename));
    } catch (ex) {
      return false;
    }

    return stat.isFile();
  },

  tryAppendExtension: function(filename, ext) {
    return filename;
  },

  install: function(less, pluginManager) {
    less.environment.addFileManager(new FileManager(this.options));
  },

  minVersion: [2, 5, 0],

  setOptions: function(args) {
    // No options for now
  },

  printUsage: function() {
    console.log('TODO: Write usage docs.');
  }
};

module.exports = FileManager;
