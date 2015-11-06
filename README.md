# less-plugin-load-json

Loads variables from JS / JSON files and makes the available to your LESS file.

## Example

```
module.exports = {
  myColor: 'red'
}
```

```
@import "values.js";

body {
  color: @myColor;
}
```

## Bugs

There are likely plenty, please file some.

## Changelog

* **0.1.1**: Remove unused dependency.
* **0.1.0**: Actually return a class, in order to work with webpack.
* **0.0.1**: First version, kinda works.
