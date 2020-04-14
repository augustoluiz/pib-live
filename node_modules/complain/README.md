# complain

Mark methods as deprecated and warn the user when they're called. Forked from [brianc/node-deprecate](https://github.com/brianc/node-deprecate).

## api

`var complain = require('complain');`

### complain()
<sup>
`complain([String message1 [, String message2 [,...]]], [Object options])`
</sup>

Call `complain` within a function you are deprecating.  It will spit out all the messages to the console the first time _and only the first time_ the method is called.

```js
1  │ var complain = require('complain');
2  │
3  │ var someDeprecatedFunction = function() {
4  │   complain('someDeprecatedFunction() is deprecated');
5  │ };
6  │
…  │ // …
30 │
31 │ someDeprecatedFunction();
```

_program output:_

<img width="373" src="https://cloud.githubusercontent.com/assets/1958812/20812831/f2a1cde0-b7c7-11e6-93e6-1613e028e719.png">

#### Options

- **`location`**: a string in the format `${filepath}:${line}:${column}` indicating where the deprecated function was called from.  Setting this to `false` disables outputting the location and will only log the message once.
- **`locationIndex`**: a number indicating the distance (in stack frames) from the call to complain to use as the deprecated location. 0 is the call to complain.  By default, it is 1, which is typically the call to the deprecated function.
- **`level`**: a number indicating the log level. 1 = notice. 2 = warning (default).
- **`heading`**: a string that will be printed in color above the message. By default, "WARNING" when `level === 2` or "NOTICE" when `level === 1`.
- **`headingColor`**: a string that is an ansi color/format. By default, `colors.warning` when `level === 2` or `colors.notice` when `level === 1`.

### complain.method()
<sup>
`complain.method(Object proto, String methodName, [String message1 [, String message2 [,...]]], [Object options])`
</sup>

Deprecates a method on an object:

```js
complain.method(console, 'log', 'You should not log.');
```

### complain.fn()
<sup>
`complain.fn(Function func, [String message1 [, String message2 [,...]]], [Object options])`
</sup>

Deprecates a function and returns it:

```js
console.log = complain.fn(console.log, 'You should not log.');
```

### complain.color

Set to `false` to disable color output.  Set to `true` to force color output.  Defaults to the value of `complain.stream.isTTY`.


### complain.colors

Controls the colors used when logging. Default value:
```js
{
  warning: '\x1b[31;1m', // red, bold
  notice: '\x1b[33;1m', // yellow, bold
  message: false, // use system color
  location: '\u001b[90m' // gray
}
```

_How the default looks on a dark background vs. a light background:_

<img width="373" src="https://cloud.githubusercontent.com/assets/1958812/20812831/f2a1cde0-b7c7-11e6-93e6-1613e028e719.png"><img width="344" src="https://cloud.githubusercontent.com/assets/1958812/20812832/f2a1edb6-b7c7-11e6-81f5-73319ae5f968.png">

### complain.silence

When `true`, do nothing when the complain method is called.

### complain.stream

The to which output is written.  Defaults to `process.stderr`.

### complain.log(message)

The function used to log, by default this function writes to `complain.stream` and falls back to `console.warn`.

You can replace this with your own logging method.

### complain.getModuleName(location)

The function that determines if a warning is coming from a `node_module`.  If the location for a warning is inside a dependent module, a single generic warning is logged once per module.  You can replace this with your own function for environments (like browsers) that might not have `node_modules` in the path.

## environment variables

### `SHOW_MODULE_COMPLAINS`

By default, deprecation warnings whose caller location is in a dependent module will not be logged.  A single module-level warning will be logged per module that is using deprecated apis.  If you wish to view the individual warnings, set this variable to a truthy value.

```
SHOW_MODULE_COMPLAINS=1 node app.js
```

### `SHOW_NESTED_COMPLAINS`

By default, if a deprecated function is using other deprecated apis, there will only be a warning for the top-level call to the deprecated function.  If you wish to view the nested warnings, set this variable to a truthy value.

```
SHOW_NESTED_COMPLAINS=1 node app.js
```

## license

MIT
