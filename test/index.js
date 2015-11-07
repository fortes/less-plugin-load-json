var assert = require('assert'),
    less = require('less'),
    loadJson = require('../index');

describe('load-json', function() {
  it('json file', function() {
    return less.render(
      '@import "./test/values.json"; body { color: @myValue; }',
      {plugins: [new loadJson({})]}
    ).then(function(contents) {
      assert.equal(contents.css, 'body {\n  color: blue;\n}\n');
    });
  });

  it('js module', function() {
    return less.render(
      '@import "./test/module.js"; body { color: @myValue; }',
      {plugins: [new loadJson({})]}
    ).then(function(contents) {
      assert.equal(contents.css, 'body {\n  color: red;\n}\n');
    });
  });
});
