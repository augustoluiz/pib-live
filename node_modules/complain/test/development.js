var assert = require('assert');

delete require.cache[require.resolve('..')];
var complain = require('..');
var moduleWithComplains = require('module-with-complains');

function someDeprecatedMethod() {
  complain('someDeprecatedMethod() is deprecated');
}

function callsSomeDeprecatedMethod() {
  someDeprecatedMethod()
}

function doubleDeprecated() {
  complain('doubleDeprecated() is deprecated');
  someDeprecatedMethod()
}

var output = {
  _text: [],
  _clear: function() {
    this._text = [];
  },
  write: function(message) {
    this._text.push(message);
  }
}

describe('complain development', function() {
  beforeEach(function() {
    output._clear();
    complain.stream = output;
  });

  it('prints the correct location', function() {
    someDeprecatedMethod();
    someDeprecatedMethod();

    // IF THIS TEST IS FAILING, CHECK THAT THE LINES MATCH THE TWO CALLS ABOVE!
    var text = output._text.join(' ');
    assert(text.indexOf('test/development.js:37:5') > 0, 'should have first location');
    assert(text.indexOf('test/development.js:38:5') > 0, 'should have second location');
  });

  it('prints the correct custom location', function() {
    function api() {
      internal();
    }

    function internal() {
      complain("test", { locationIndex:2 })
    }

    api();

    // IF THIS TEST IS FAILING, CHECK THAT THE LINE MATCHES THE api() CALL ABOVE!
    var text = output._text.join(' ');
    assert(text.indexOf('test/development.js:55:5') > 0, 'should have api location');
  });

  it('does nothing if silence is turned on', function() {
    complain.silence = true;
    complain('this method is deprecated and will be removed');
    assert.equal(output._text.length, 0);
  });

  it('prints to output if silence is turned off', function() {
    complain.silence = false;
    complain('line1', 'line2', 'line3', { location:false });
    var text = output._text.join(' ');
    assert(text.indexOf('WARNING') > 0, 'should have contained the string "warning"');
    assert(text.indexOf('line1') > 0, 'should have contained the string "line1"');
    assert(text.indexOf('line2') > 0, 'should have contained the string "line2"');
    assert(text.indexOf('line2') > text.indexOf('line1'), 'line 2 should come after line 1');
    assert(text.indexOf(complain.colors.warning) > 0, 'should have color');
  });

  it('allows a lower log level', function() {
    complain('this is a less urgent message', { level:1, locationIndex:0 });
    var text = output._text.join(' ');
    assert(text.indexOf('NOTICE') > 0, 'should have contained the string "notice"');
    assert(text.indexOf('this is a less urgent message') > 0, 'should have contained the message');
  });

  it('allows custom header', function() {
    complain('this is a migratable deprecation', { heading:'MIGRATE', headingColor:'\x1b[36;1m', locationIndex:0 });
    var text = output._text.join(' ');
    assert(text.indexOf('MIGRATE') > 0, 'should have contained the string "migrate"');
    assert(text.indexOf('this is a migratable deprecation') > 0, 'should have contained the message');
  });

  it('shows single generic notice if the complain comes from a node_module', function() {
    moduleWithComplains.one();
    var text = output._text.join(' ');
    assert(text.indexOf('NOTICE') > 0, 'should have contained the string "notice"');
    assert(text.indexOf('module-with-complains') > 0, 'should contain the module name');
    moduleWithComplains.two();
    assert(text === output._text.join(' '), 'should not log more than once per module');
  });

  it('allows location to be turned off and then only prints once per call', function() {
    function foo() {
      complain('foo is deprecated', { location:false });
    }

    assert.equal(output._text.length, 0);

    // logs the first time
    foo();
    var text = output._text.join(' ');
    var length = output._text.length;
    assert(text.indexOf('WARNING') > 0, 'should have contained the string "warning"');
    assert.equal(text.indexOf(' at '), -1, 'should not have the location');

    // but not the second
    foo();
    assert.equal(output._text.length, length);
  })

  it('does not print color if color turned off', function() {
    complain.color = false;
    complain('test');
    var text = output._text.join(' ');
    assert.equal(text.indexOf(complain.color), -1, 'should not have color string');
    assert.equal(text.indexOf('\x1b[0m'), -1, 'should not have reset color char ');
  });

  it('only prints once for each call location', function() {
    assert.equal(output._text.length, 0);

    // this should output since it is the first time
    // `callsSomeDeprecatedMethod` will call the deprecated method
    callsSomeDeprecatedMethod();
    var length = output._text.length;
    assert(length > 0, "should have printed deprecation warning");

    // this should NOT output since the deprecated method
    // has already been called by `callsSomeDeprecatedMethod`
    callsSomeDeprecatedMethod();
    assert.equal(length, output._text.length, "should not have warned again");

    // this should output because it's a new call to the deprecated method
    someDeprecatedMethod();
    assert(output._text.length > length);
  });

  it('can wrap a method', function() {
    var called;

    function Test() {}
    Test.prototype.foo = function(a, b, c) {
      called = { a:a, b:b, c:c };
    };
    complain.method(Test.prototype, 'foo', 'Don\'t call foo');

    var test = new Test();
    test.foo(1, 2, 3);

    var text = output._text.join(' ');
    assert(text.indexOf('Don\'t call foo') > 0, 'should have contained message');
    assert(called.a === 1, 'should have passed the arguments to the function');
    assert(called.b === 2, 'should have passed the arguments to the function');
    assert(called.c === 3, 'should have passed the arguments to the function');
  });

  it('can wrap a function', function() {
    var called;

    var foo = complain.fn(function foo(a, b, c) {
      called = { a:a, b:b, c:c };
    }, 'Don\'t call foo');

    foo(1, 2, 3);

    var text = output._text.join(' ');
    assert(text.indexOf('Don\'t call foo') > 0, 'should have contained message');
    assert(called.a === 1, 'should have passed the arguments to the function');
    assert(called.b === 2, 'should have passed the arguments to the function');
    assert(called.c === 3, 'should have passed the arguments to the function');
  });

  it('logs a warning to console without custom stream', function(done) {
    var warn = console.warn;
    console.warn = function () {
      done();
    }

    complain.stream = undefined;
    complain('fail', { location:false });
    console.warn = warn;
  });

  it('does nothing when missing console and stream', function() {
    var warn = console.warn;
    console.warn = undefined
    delete require.cache[require.resolve('..')];
    var complain = require('..');
    complain.stream = undefined;
    complain.log('fail');
    console.warn = warn;
  });

  it('only logs the top-level complain for a callstack', function() {
    doubleDeprecated()

    var text = output._text.join(' ');
    assert(text.indexOf('doubleDeprecated') > 0, 'should have contained the string "doubleDeprecated"');
    assert.equal(text.indexOf('someDeprecatedMethod'), -1, 'should not have contained the string "someDeprecatedMethod"');
  });
});
