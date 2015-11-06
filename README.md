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
