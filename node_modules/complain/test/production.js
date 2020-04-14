var assert = require('assert');

process.env.NODE_ENV = 'production';
delete require.cache[require.resolve('..')];
var complain = require('..');
process.env.NODE_ENV = undefined;


var output = {
  _text: [],
  _clear: function() {
    this._text = [];
  },
  write: function(message) {
    this._text.push(message);
  }
}

describe('complain production', function() {
  beforeEach(function() {
    output._clear();
    complain.stream = output;
  });

  it('noop in prod', function() {
    complain('fail');
    assert.deepEqual(output._text, [], 'should not add complaints');
  });

  it('noop in prod when wrapping a function', function() {
    complain.fn(function () {}, 'fail')();
    assert.deepEqual(output._text, [], 'should not add complaints');
  });
});
