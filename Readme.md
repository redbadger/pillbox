# Pillbox

  Pillbox input component, a fork of [component/pillbox](https://github.com/component/pillbox), which itself is a fork of [tomerdmnt/tag-input](https://github.com/tomerdmnt/tag-input).

  Adds autocomplete support to the pillbox. You can only allow whitelisted tags, or just use the autocomplete as suggestions.


  ![Tags Input](https://raw.github.com/redbadger/pillbox/master/pillbox_demo.gif)

  Autocomplete does not support server round trip completion at th emoment.

## How to use

This is a component component. You can easily plug it into your site or web app. Check the example of usage in test/index.html. To get things working, follow these easy steps (assuming you already have Node.js and npm installed):

* `npm install -g component`
* Clone this repository and navigate into the component folder
* Run `component install` to fetch dependencies
* Run `component build`
* Now you can open test/index.html and if everything is fine you should be able to see the component in action

If your app already uses components, you can simply run `component install redbadger/pillbox` - this will fetch and install all dependencies into /components folder of your project.

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
