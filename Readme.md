
# tag-input

  Tag set input token, a fork of [tomerdmnt/tag-input](https://github.com/tomerdmnt/tag-input).

  ![Tags Input](http://f.cl.ly/items/0S262y000s1y441m0Z1l/Screen%20Shot%202012-10-12%20at%205.25.16%20PM.png)

## Install

```
$ component install visionmedia/tag-input
```

## Example

``` javascript
var TagInput = require('tag-input');

var input = TagInput(document.getElementById('tags'))

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

### TagInput#add(tag)

  Add `tag` string if it does not already exist.

### TagInput#remove(tag)

  Remove `tag` string if it exists.

