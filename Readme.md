# Pillbox

  Pillbox input component, a fork of [component/pillbox](https://github.com/component/pillbox), which itself is a fork of [tomerdmnt/tag-input](https://github.com/tomerdmnt/tag-input).

  Adds autocomplete support to the pillbox. You can only allow whitelisted tags, or just use the autocomplete as suggestions.


  ![Tags Input](https://raw.github.com/redbadger/pillbox/master/pillbox_demo.gif)

  Autocomplete does not support server round trip completion at th emoment.

## Install

```
$ component install redbadger/pillbox
```

## Example

``` javascript
var Pillbox = require('pillbox');

var input = Pillbox(document.getElementById('tags'))

input.on('add', function(tag){
  console.log(tag + ' added');
});

input.on('remove', function(tag){
  console.log(tag + ' removed');
});
```

## Events

 - `add` (tag)
 - `remove` (tag)

## API

### Pillbox(input, possibilities, options)

  Initialize with the given `input` element, possible tags `possibilities` and `options`. Available options include:

  * `lowercase`: all added tags get converted to lowercase.
  * `strict`: only allow tags listed in `possibilities`

### Pillbox#add(tag)

  Add `tag` string if it does not already exist.

### Pillbox#remove(tag)

  Remove `tag` string if it exists.

### Pillbox#values([array])

  Set / Get the tags.

# License

  MIT
